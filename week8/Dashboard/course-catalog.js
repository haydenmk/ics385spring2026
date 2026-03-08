class CourseCatalogManager {

	constructor() {

		this.courseCatalog = null;
		this.filteredCourses = [];
		this.searchCache = new Map();
		this.currentSearch = "";
		this.currentDepartment = "all";
		this.currentCredits = "all";

		this.initializeApp();

	}

	initializeApp() {

		try {

			this.setupEventListeners();
			this.loadSampleData();

		} catch (error) {

			this.handleError("Application initialization failed", error);

		}

	}

	setupEventListeners() {

		document.getElementById("searchInput").addEventListener("input", (event) => {

			this.currentSearch = event.target.value;
			this.applyFilters();

		});

		document.getElementById("clearSearchBtn").addEventListener("click", () => {

			document.getElementById("searchInput").value = "";
			this.currentSearch = "";
			this.applyFilters();

		});

		document.getElementById("departmentFilter").addEventListener("change", (event) => {

			this.currentDepartment = event.target.value;
			this.applyFilters();

		});

		document.getElementById("creditsFilter").addEventListener("change", (event) => {

			this.currentCredits = event.target.value;
			this.applyFilters();

		});

		document.getElementById("loadSampleBtn").addEventListener("click", () => {

			this.loadSampleData();

		});

		document.getElementById("addCourseBtn").addEventListener("click", () => {

			this.addNewCourse();

		});

		document.getElementById("exportBtn").addEventListener("click", () => {

			this.exportToJSON();

		});

		document.getElementById("closeModalBtn").addEventListener("click", () => {

			this.hideModal();

		});

		document.getElementById("courseModal").addEventListener("click", (event) => {

			if (event.target.id === "courseModal") {

				this.hideModal();

			}

		});

	}

	async loadSampleData() {

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

	loadCourseData(jsonString) {

		try {

			const data = JSON.parse(jsonString);

			this.validateCatalogStructure(data);

			this.courseCatalog = data;

			/* NEW: populate department dropdown from JSON */
			this.populateDepartmentFilter();

			this.searchCache.clear();

			this.applyFilters();

		} catch (error) {

			this.handleError("Failed to load course data", error);

		}

	}

	/* NEW FUNCTION */
	populateDepartmentFilter() {

		const departmentFilter = document.getElementById("departmentFilter");

		if (!departmentFilter || !this.courseCatalog) {

			return;

		}

		departmentFilter.innerHTML = '<option value="all">All Departments</option>';

		this.courseCatalog.departments.forEach((department) => {

			const option = document.createElement("option");

			option.value = department.code;

			option.textContent = department.code + " - " + department.name;

			departmentFilter.appendChild(option);

		});

	}

	validateCatalogStructure(data) {

		const requiredFields = ["university", "semester", "departments", "metadata"];

		const missingFields = requiredFields.filter((field) =>
			!Object.prototype.hasOwnProperty.call(data, field)
		);

		if (missingFields.length > 0) {

			throw new Error("Missing required fields: " + missingFields.join(", "));

		}

	}

	getAllCourses() {

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

	applyFilters() {

		let results = this.getAllCourses();

		const searchTerm = this.currentSearch.trim().toLowerCase();

		if (searchTerm.length > 0) {

			results = results.filter((course) => {

				return (

					course.courseCode.toLowerCase().includes(searchTerm) ||
					course.title.toLowerCase().includes(searchTerm) ||
					course.description.toLowerCase().includes(searchTerm) ||
					course.instructor.name.toLowerCase().includes(searchTerm) ||
					course.departmentName.toLowerCase().includes(searchTerm)

				);

			});

		}

		if (this.currentDepartment !== "all") {

			results = results.filter((course) =>
				course.departmentCode === this.currentDepartment
			);

		}

		if (this.currentCredits !== "all") {

			results = results.filter((course) =>
				String(course.credits) === this.currentCredits
			);

		}

		this.filteredCourses = results;

		this.displayAllCourses();

		this.displayStatistics();

	}

	displayAllCourses() {

		const container = document.getElementById("coursesContainer");

		container.innerHTML = "";

		if (this.filteredCourses.length === 0) {

			container.innerHTML =
				'<div class="no-results">No courses found matching your criteria.</div>';

			return;

		}

		this.filteredCourses.forEach((course) => {

			const cardDiv = document.createElement("div");

			cardDiv.className = "course-card";

			cardDiv.innerHTML =

				"<h3>" + course.courseCode + "</h3>" +
				"<h4>" + course.title + "</h4>" +
				"<p>" + course.description + "</p>" +
				"<p><strong>Instructor:</strong> " + course.instructor.name + "</p>";

			container.appendChild(cardDiv);

		});

	}

	displayStatistics() {

		const allCourses = this.getAllCourses();

		document.getElementById("totalCourses").textContent = allCourses.length;

		document.getElementById("totalDepartments").textContent =
			this.courseCatalog ? this.courseCatalog.departments.length : 0;

		document.getElementById("averageEnrollment").textContent =
			this.calculateEnrollmentStats() + "%";

	}

	calculateEnrollmentStats() {

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

	addNewCourse() {

		alert("Course creation available in full version of catalog.");

	}

	exportToJSON() {

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

	handleError(operation, error) {

		console.error(operation, error);

		alert(operation + ": " + error.message);

	}

}

document.addEventListener("DOMContentLoaded", function () {

	window.app = new CourseCatalogManager();

});