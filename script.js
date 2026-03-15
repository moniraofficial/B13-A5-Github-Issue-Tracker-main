const BASE_URL = "https://phi-lab-server.vercel.app/api/v1/lab";
let allIssuesData = []; 
const totalCount = document.getElementsByClassName('totalCount')

// 1. AUTHENTICATION LOGIC
function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

  
    if (user === "admin" && pass === "admin123") {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('main-section').classList.remove('hidden');
        fetchAllIssues(); 
    } else {
        alert("Incorrect Username or Password!");
    }
}

// 2. DATA FETCHING
async function fetchAllIssues() {
    showLoader(true);
    try {
        const response = await fetch(`${BASE_URL}/issues`);
        const data = await response.json();
        allIssues = data.data || [];

        renderIssues(allIssues);
        updateCounts(allIssues);
    } catch (error) {
        console.error("Error fetching issues:", error);
    } finally {
        showLoader(false);
    }
}

/* =========================================
   2. FILTER & SEARCH LOGIC
========================================= */
async function handleSearch() {
    const searchText = document.getElementById("searchInput").value.trim();
    
    if (searchText === "") {
        renderIssues(allIssues);
        updateCounts(allIssues);
        return;
    }

    showLoader(true);
    try {
        const response = await fetch(`${BASE_URL}/issues/search?q=${searchText}`);
        const data = await response.json();
        const results = data.data || [];

        renderIssues(results);
        updateCounts(results);
    } catch (error) {
        console.error("Search error:", error);
    } finally {
        showLoader(false);
    }
}

function filterByStatus(status, button) {
    // UI: Toggle Active Tab State
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("tab-active"));
    button.classList.add("tab-active");

    // Logic: Filter Data
    const filteredIssues = status === "all" 
        ? allIssues 
        : allIssues.filter(issue => issue.status.toLowerCase() === status);

    renderIssues(filteredIssues);
    updateCounts(filteredIssues);
}

/* =========================================
   3. UI RENDERING (CARD COMPONENT)
========================================= */
function renderIssues(issues) {
    const container = document.getElementById("issue-container");
    
    
    container.innerHTML = "";
        if (!issues.length) {
        container.innerHTML = `
            <p class="col-span-full text-center py-20 text-gray-400 font-semibold italic">
                No issues found matching your criteria.
            </p>`;
        return;
    }

    issues.forEach(issue => {
        
        const isClosed = issue.status.toLowerCase() === "closed";
         const borderColor = isClosed ? "border-purple-500" : "border-green-500";
        const statusIcon = isClosed ? "Closed- Status .png" : "Open-Status.png";
        const iconBg = isClosed ? "bg-purple-50" : "bg-green-50";

        // 3. Priority Color Logic
       const priorityStyles = 
    issue.priority === 'High' ? 'bg-red-50 text-red-500 border-red-100' : 
    issue.priority === 'Medium' ? 'bg-orange-50 text-orange-500 border-orange-100' : 
    'bg-slate-50 text-slate-400 border-slate-200';

        // 4. Create the Card Element
        const card = document.createElement("div");
        card.className = `card bg-white shadow-sm border border-gray-100 hover:shadow-md transition border-t-4 ${borderColor}`;
        
        // Link to the details modal
        card.onclick = () => openIssueModal(issue.id);

        // 5. Build HTML Structure
        card.innerHTML = `
            <div class="card-body p-6">
                <div class="flex justify-between items-start mb-3">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center ${iconBg}">
                        <img src="./assets/${statusIcon}" class="w-5 h-5 object-contain" alt="status"/>
                    </div>
                    <div class="badge ${priorityStyles} border text-[10px] font-black uppercase px-2 py-3">
                        ${issue.priority}
                    </div>
                </div>

                <h2 class="font-bold text-[15px] text-slate-900 line-clamp-1 mb-1">${issue.title}</h2>
                <p class="text-xs text-slate-500 line-clamp-2 mb-4">${issue.description}</p>

                <div class="flex gap-2 mt-auto">
                    <span class="badge bg-red-50 text-red-400 border-red-100 text-[9px] font-bold uppercase">BUG</span>
                    <span class="badge bg-orange-50 text-orange-400 border-orange-100 text-[9px] font-bold uppercase">HELP WANTED</span>
                </div>

                <div class="divider my-3 opacity-50"></div>

                <div class="flex justify-between items-center text-slate-400 font-medium">
                    <p class="text-[11px]">#${issue.id} by ${issue.author}</p>
                    <p class="text-[10px]">${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

/* =========================================
   4. MODALS & UTILITIES
========================================= */
async function openIssueModal(issueId) {
    try {
        const response = await fetch(`${BASE_URL}/issue/${issueId}`);
        const data = await response.json();
        const issue = data.data;

        const modalBody = document.getElementById("modal-body");

        // Format Date like 22/02/2026
        const formattedDate = new Date(issue.createdAt).toLocaleDateString('en-GB');

        modalBody.innerHTML = `
            <h2 class="text-2xl font-bold text-slate-800 mb-2">${issue.title}</h2>
            
            <div class="flex items-center gap-2 mb-6">
                <span class="badge bg-green-500 text-white border-none py-3 px-4 rounded-lg text-xs font-bold capitalize">
                    ${issue.status}
                </span>
                <span class="text-xs text-slate-400 font-medium">
                    • Opened by <span class="text-slate-600">${issue.author}</span> • ${formattedDate}
                </span>
            </div>

            <div class="flex gap-2 mb-6">
                <span class="badge bg-red-50 text-red-400 border-red-100 text-[10px] font-bold uppercase py-3">BUG</span>
                <span class="badge bg-orange-50 text-orange-400 border-orange-100 text-[10px] font-bold uppercase py-3">HELP WANTED</span>
            </div>

            <p class="text-[13px] leading-relaxed text-slate-500 mb-8 max-w-prose">
                ${issue.description}
            </p>

            <div class="bg-slate-50 rounded-xl p-6 flex items-center justify-between mb-8">
                <div>
                    <p class="text-[11px] text-slate-400 uppercase font-black mb-1">Assignee:</p>
                    <p class="font-bold text-slate-700">${issue.author}</p>
                </div>
                <div class="text-right">
                    <p class="text-[11px] text-slate-400 uppercase font-black mb-1">Priority:</p>
                    <span class="badge bg-red-500 text-white border-none text-[10px] font-black px-4 py-3 uppercase">
                        ${issue.priority}
                    </span>
                </div>
            </div>

            <div class="flex justify-end">
                <form method="dialog">
                    <button class="btn bg-[#5D00FF] hover:bg-[#4A00CC] text-white border-none px-8 rounded-lg capitalize">
                        Close
                    </button>
                </form>
            </div>
        `;

        document.getElementById("issue_modal").showModal();

    } catch (error) {
        console.error("Modal error:", error);
    }
}

/* =========================================
   UPDATE ISSUE COUNTS
========================================= */
function updateCounts(data) {
    const totalEl = document.getElementById("total-issue-count");
    
    if (totalEl) {
        totalEl.innerText = data.length;
    }
}

function showLoader(show) {
    const loader = document.getElementById("loading-spinner");
    const container = document.getElementById("issue-container");
    if (!loader) return;

    show ? loader.classList.remove("hidden") : loader.classList.add("hidden");
    show ? container.classList.add("opacity-20") : container.classList.remove("opacity-20");
}