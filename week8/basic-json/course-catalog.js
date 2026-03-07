class CourseCatalogManager { // Defines the CourseCatalogManager JavaScript class
  constructor() { // Constructor initializes the different variables used for storing course data, search filters, and then initializes the app to start it
    this.courseCatalog = null; 
    this.filteredCourses = [];
    this.searchCache = new Map();
    this.currentSearch = "";
    this.currentDepartment = "all";
    this.currentCredits = "all"; 

    this.initializeApp();
  }

  initializeApp() { // Initalizes the app when the page loads
    try {
      this.setupEventListeners(); // Sets up event listeners for buttons and inputs
      this.loadSampleData(); // Loads the sample course data for the interface
    } catch (error) {
      this.handleError("Application initialization failed", error);
    }
  }

  setupEventListeners() { // Adds event listeners on interactive portions of the page (search bars, dropdown filters, button functionalities)
    document.getElementById("searchInput").addEventListener("input", (event) => { 
      this.currentSearch = event.target.value;
      this.applyFilters();
    });

    document.getElementById("clearSearchBtn").addEventListener("click", () => { // Detects when the user types in the search box
      document.getElementById("searchInput").value = ""; 
      this.currentSearch = ""; // Saves the text input by the user and updates the displayed courses
      this.applyFilters();
    });

    document.getElementById("departmentFilter").addEventListener("change", (event) => { // Detects when the user changes the dropdown filter
      this.currentDepartment = event.target.value; // Stores the selected department and updates the course list to only display courses from that department
      this.applyFilters();
    });

    document.getElementById("creditsFilter").addEventListener("change", (event) => { // Detects when the user selects a credits filter
      this.currentCredits = event.target.value; // Saves the credit value of the selected class, then refreshes the course list to only include classes with the selected value
      this.applyFilters();
    });

    document.getElementById("loadSampleBtn").addEventListener("click", () => { // When run, loads the sample JSON course catalog file and then displays all of the courses on the page
      this.loadSampleData();
    });

    document.getElementById("addCourseBtn").addEventListener("click", () => { // Runs when the "Add New Course" button is clicked, prompts the user to add course information if the course information is valid
      this.addNewCourse();
    });

    document.getElementById("exportBtn").addEventListener("click", () => { // Runs when the "Export JSON" button is clicked, downloads the entire course catalog as a JSON file
      this.exportToJSON();
    });

      document.getElementById("closeModalBtn").addEventListener("click", () => { // Closes the course details modal when the close button is clicked
      this.hideModal();
    });

    document.getElementById("courseModal").addEventListener("click", (event) => { // Allows the modal window to close when the user clicks outside the modal content
      if (event.target.id === "courseModal") {
        this.hideModal();
      }
    });
  }

  async loadSampleData() { // Loads the sample JSON file containing course catalog data
    try {
      const response = await fetch("sample-data.json");
      if (!response.ok) {
        throw new Error("Could not load sample-data.json");
      }

      const jsonText = await response.text();
      this.loadCourseData(jsonText);
    } catch (error) {
      this.handleError("Failed to load sample data", error);
    }
  }

  loadCourseData(jsonString) { // Converts the raw JSON string into a JavaScript object, then validates its structure, and then loads the catalog into the application for searching in order to display it
    try {
      if (!jsonString || typeof jsonString !== "string") {
        throw new Error("Invalid input: JSON string required");
      }

      const data = JSON.parse(jsonString);
      this.validateCatalogStructure(data);

      this.courseCatalog = data;
      this.searchCache.clear();
      this.applyFilters();
    } catch (error) {
      this.handleError("Failed to load course data", error);
    }
  }

  validateCatalogStructure(data) { // Verifies that the JSON catalog has the required fields (university, semester, departments, metadata) and that each department has valid course arrays
    const requiredFields = ["university", "semester", "departments", "metadata"];
    const missingFields = requiredFields.filter((field) => !Object.prototype.hasOwnProperty.call(data, field));

    if (missingFields.length > 0) {
      throw new Error("Missing required fields: " + missingFields.join(", "));
    }

    if (!Array.isArray(data.departments) || data.departments.length === 0) {
      throw new Error("Departments array is required and must contain at least one department");
    }

    data.departments.forEach((department, index) => {
      if (!department.code || !department.name || !Array.isArray(department.courses)) {
        throw new Error("Department " + index + " missing required fields");
      }
    });
  }

  getAllCourses() { // Extracts courses from the nested JSON department structure and combines them into a single array to make searching and filtering easier
    if (!this.courseCatalog) {
      return [];
    }

    const allCourses = [];

    this.courseCatalog.departments.forEach((department) => {
      department.courses.forEach((course) => {
        allCourses.push({
          ...course,
          departmentCode: department.code,
          departmentName: department.name
        });
      });
    });

    return allCourses;
  }

  applyFilters() { // Applies the search text, department filter, and credit filter to determine which courses should be displayed by the website
    let results = this.getAllCourses();

    const searchTerm = this.currentSearch.trim().toLowerCase();

    if (searchTerm.length > 0) {
      if (this.searchCache.has(searchTerm)) {
        results = this.searchCache.get(searchTerm);
      } else {
        results = results.filter((course) => {
          return (
            course.courseCode.toLowerCase().includes(searchTerm) ||
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.instructor.name.toLowerCase().includes(searchTerm) ||
            course.departmentName.toLowerCase().includes(searchTerm) ||
            course.topics.some((topic) => topic.toLowerCase().includes(searchTerm))
          );
        });

        this.searchCache.set(searchTerm, results);
      }
    }

    if (this.currentDepartment !== "all") {
      results = results.filter((course) => course.departmentCode === this.currentDepartment);
    }

    if (this.currentCredits !== "all") {
      results = results.filter((course) => String(course.credits) === this.currentCredits);
    }

    this.filteredCourses = results;
    this.displayAllCourses();
    this.displayStatistics();
  }

  displayAllCourses() { // Displays the filtered courses as cards on the webpage
    const container = document.getElementById("coursesContainer");

    if (!container) {
      console.error("Courses container not found");
      return;
    }

    container.innerHTML = "";

    if (this.filteredCourses.length === 0) {
      container.innerHTML = '<div class="no-results">No courses found matching your criteria.</div>';
      return;
    }

    this.filteredCourses.forEach((course) => {
      const courseCard = this.createCourseCard(course);
      container.appendChild(courseCard);
    });
  }

  createCourseCard(course) { // Creates the HTML course card element that displays course information using the JSON data
    const cardDiv = document.createElement("div");
    cardDiv.className = "course-card";

    const enrollmentPercent = Math.round((course.schedule.enrolled / course.schedule.capacity) * 100);

    let enrollmentStatus = "open";
    if (enrollmentPercent >= 90) {
      enrollmentStatus = "full";
    } else if (enrollmentPercent >= 70) {
      enrollmentStatus = "filling";
    }

      cardDiv.innerHTML = `
      <div class="course-header">
        <h3 class="course-code">${course.courseCode}</h3>
        <span class="credits">${course.credits} credits</span>
      </div>

      <h4 class="course-title">${course.title}</h4>

      <p class="course-description">${this.truncateText(course.description, 120)}</p>

      <div class="instructor-info">
        <strong>Instructor:</strong> ${course.instructor.name}
      </div>

      <div class="schedule-info">
        <strong>Schedule:</strong> ${course.schedule.days.join(", ")} ${course.schedule.time}
      </div>

      <div class="enrollment-info ${enrollmentStatus}">
        Enrolled: ${course.schedule.enrolled}/${course.schedule.capacity} (${enrollmentPercent}%)
      </div>

      <div class="topics">
        ${course.topics.map((topic) => `<span class="topic-tag">${topic}</span>`).join("")}
      </div>

      <button class="details-btn">View Details</button>
    `;

    cardDiv.querySelector(".details-btn").addEventListener("click", () => { // Opens the modal window displaying full course details
      this.showCourseDetails(course.courseCode);
    });

    return cardDiv;
  }

  truncateText(text, maxLength) { // Shortens long text descriptions so course cards remain readable
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  }

  showCourseDetails(courseCode) { // Finds the selected course in the catalog JSON and displays all course information inside the modal window
    const course = this.getAllCourses().find((item) => item.courseCode === courseCode);

    if (!course) {
      return;
    }

    const modalBody = document.getElementById("modalBody");
    const modal = document.getElementById("courseModal");

    modalBody.innerHTML = `
      <h2>${course.courseCode} - ${course.title}</h2>
      <p><strong>Department:</strong> ${course.departmentName}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Description:</strong> ${course.description}</p>
      <p><strong>Prerequisites:</strong> ${course.prerequisites.length > 0 ? course.prerequisites.join(", ") : "None"}</p>

      <h3>Instructor</h3>
      <p><strong>Name:</strong> ${course.instructor.name}</p>
      <p><strong>Email:</strong> ${course.instructor.email}</p>
      <p><strong>Office:</strong> ${course.instructor.office}</p>

      <h3>Schedule</h3>
      <p><strong>Days:</strong> ${course.schedule.days.join(", ")}</p>
      <p><strong>Time:</strong> ${course.schedule.time}</p>
      <p><strong>Location:</strong> ${course.schedule.location}</p>
      <p><strong>Capacity:</strong> ${course.schedule.capacity}</p>
      <p><strong>Enrolled:</strong> ${course.schedule.enrolled}</p>

      <h3>Topics</h3>
      <p>${course.topics.join(", ")}</p>

      <h3>Assignments</h3>
      <ul>
        ${course.assignments.map((assignment) => `
          <li>${assignment.name} - ${assignment.points} pts - Due ${assignment.dueDate}</li>
        `).join("")}
      </ul>
    `;

    modal.classList.remove("hidden"); // Makes the modal visible
  }

  hideModal() { // Hides the modal window when the user closes it
    document.getElementById("courseModal").classList.add("hidden");
  }

  displayStatistics() { // Updates catalog statistics such as total courses, total departments, and average enrollment using the course catalog data
    const allCourses = this.getAllCourses();

    document.getElementById("totalCourses").textContent = allCourses.length;
    document.getElementById("totalDepartments").textContent = this.courseCatalog ? this.courseCatalog.departments.length : 0;
    document.getElementById("averageEnrollment").textContent = this.calculateEnrollmentStats() + "%";
  }

  calculateEnrollmentStats() { // Calculates the overall enrollment percentage by comparing total enrolled students to total course capacity using Math function
    const allCourses = this.getAllCourses();

    if (allCourses.length === 0) {
      return 0;
    }

    let totalEnrolled = 0;
    let totalCapacity = 0;

    allCourses.forEach((course) => {
      totalEnrolled += course.schedule.enrolled;
      totalCapacity += course.schedule.capacity;
    });

    if (totalCapacity === 0) {
      return 0;
    }

    return Math.round((totalEnrolled / totalCapacity) * 100);
  }

  validateCourseData(course) { // Validates new course data to ensure required fields, correct data types, and logical constraints before adding it to the catalog
    const errors = [];

    const requiredStrings = ["courseCode", "title", "description"];
    requiredStrings.forEach((field) => {
      if (!course[field] || typeof course[field] !== "string" || course[field].trim().length === 0) {
        errors.push("Missing or invalid " + field);
      }
    });

    if (!Number.isInteger(course.credits) || course.credits < 1 || course.credits > 6) {
      errors.push("Credits must be an integer between 1 and 6");
    }

    if (!course.instructor || typeof course.instructor !== "object") {
      errors.push("Instructor information is required");
    } else {
      if (!course.instructor.name || !course.instructor.email) {
        errors.push("Instructor name and email are required");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (course.instructor.email && !emailRegex.test(course.instructor.email)) {
        errors.push("Invalid instructor email format");
      }
    }

    if (!course.schedule || typeof course.schedule !== "object") {
      errors.push("Schedule information is required");
    } else {
      if (!Array.isArray(course.schedule.days) || course.schedule.days.length === 0) {
        errors.push("Schedule days must be a non-empty array");
      }

      if (typeof course.schedule.capacity !== "number" || course.schedule.capacity < 1) {
        errors.push("Schedule capacity must be a positive number");
      }

      if (typeof course.schedule.enrolled !== "number" || course.schedule.enrolled < 0) {
        errors.push("Schedule enrolled must be a non-negative number");
      }

      if (course.schedule.enrolled > course.schedule.capacity) {
        errors.push("Enrolled students cannot exceed capacity");
      }
    }

    if (!Array.isArray(course.topics) || course.topics.length === 0) {
      errors.push("At least one topic is required");
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  addNewCourse() { // Prompts the user to enter course information and adds the course to the catalog if the data input follows the format
    if (!this.courseCatalog) {
      alert("Load sample data first.");
      return;
    }

    const departmentCode = prompt("Enter department code (ICS, MATH, ENG):");
    if (!departmentCode) {
      return;
    }

    const department = this.courseCatalog.departments.find(
      (dept) => dept.code.toUpperCase() === departmentCode.toUpperCase()
    );

    if (!department) {
      alert("Department not found.");
      return;
    }

    const courseCode = prompt("Enter course code:");
    const title = prompt("Enter course title:");
    const credits = parseInt(prompt("Enter credits (1-6):"), 10);
    const description = prompt("Enter description:");
    const instructorName = prompt("Enter instructor name:");
    const instructorEmail = prompt("Enter instructor email:");
    const instructorOffice = prompt("Enter instructor office:");
    const daysInput = prompt("Enter schedule days separated by commas:");
    const time = prompt("Enter class time:");
    const location = prompt("Enter class location:");
    const capacity = parseInt(prompt("Enter capacity:"), 10);
    const enrolled = parseInt(prompt("Enter enrolled students:"), 10);
    const topicsInput = prompt("Enter topics separated by commas:");

    const newCourse = {
      courseCode: courseCode,
      title: title,
      credits: credits,
      description: description,
      prerequisites: [],
      instructor: {
        name: instructorName,
        email: instructorEmail,
        office: instructorOffice || "TBA"
      },
      schedule: {
        days: daysInput ? daysInput.split(",").map((day) => day.trim()).filter(Boolean) : [],
        time: time || "TBA",
        location: location || "TBA",
        capacity: capacity,
        enrolled: enrolled
      },
      isActive: true,
      topics: topicsInput ? topicsInput.split(",").map((topic) => topic.trim()).filter(Boolean) : [],
      assignments: []
    };

    const validation = this.validateCourseData(newCourse);

    if (!validation.isValid) {
      alert("Course could not be added:\n\n" + validation.errors.join("\n"));
      return;
    }

    department.courses.push(newCourse);
    this.searchCache.clear();
    this.applyFilters();
    alert("Course added successfully.");
  }

  exportToJSON() { // Converts the catalog into JSON format and downloads it as a file
    if (!this.courseCatalog) {
      alert("No course catalog data to export.");
      return;
    }

    const jsonString = JSON.stringify(this.courseCatalog, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "course-catalog-export.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  handleError(operation, error) { // Handles errors by logging them to the console and displaying a message to the user
    console.error(operation, error);
    alert(operation + ": " + error.message);
  }
}

document.addEventListener("DOMContentLoaded", function () { // Starts the course catalog application after the HTML page finishes loading
  window.app = new CourseCatalogManager();
});
