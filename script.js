// Mock Data
const scholarships = [
    { id: 1, title: "STEM Excellence Award", amount: "$5,000", deadline: "May 20, 2026", category: "Academic" },
    { id: 2, title: "Global Leaders Grant", amount: "$10,000", deadline: "June 15, 2026", category: "Leadership" },
    { id: 3, title: "Women in Tech Scholarship", amount: "$3,500", deadline: "May 30, 2026", category: "Technology" },
    { id: 4, title: "Arts & Humanities Fund", amount: "$2,000", deadline: "July 01, 2026", category: "Arts" }
];

let appliedList = [];

// Initialize Page
window.onload = () => {
    renderGrants(scholarships);
};

// Switch Sidebar Tabs
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Render Scholarship Cards
function renderGrants(data) {
    const grid = document.getElementById('grantGrid');
    grid.innerHTML = data.map(g => `
        <div class="grant-card">
            <span class="badge" style="background: #e0e7ff; color: #4338ca; margin-bottom: 10px; display: inline-block;">${g.category}</span>
            <h3>${g.title}</h3>
            <p class="amount">${g.amount}</p>
            <p class="deadline"><i class="far fa-calendar-alt"></i> Deadline: ${g.deadline}</p>
            <button class="btn-apply" onclick="openApplyModal('${g.title}')">Apply Now</button>
        </div>
    `).join('');
}

// Search Logic
function searchGrants() {
    const query = document.getElementById('grantSearch').value.toLowerCase();
    const filtered = scholarships.filter(s => s.title.toLowerCase().includes(query));
    renderGrants(filtered);
}

// Application Logic
function openApplyModal(title) {
    document.getElementById('modalTitle').innerText = "Apply for " + title;
    document.getElementById('applyModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('applyModal').style.display = 'none';
}

document.getElementById('scholarshipForm').onsubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById('modalTitle').innerText.replace("Apply for ", "");
    
    appliedList.push({
        title: title,
        date: new Date().toLocaleDateString(),
        status: "Under Review"
    });

    updateHistory();
    closeModal();
    alert("Application submitted successfully!");
};

function updateHistory() {
    const tbody = document.getElementById('appHistory');
    tbody.innerHTML = appliedList.map(a => `
        <tr>
            <td><strong>${a.title}</strong></td>
            <td>${a.date}</td>
            <td><span class="badge pending">${a.status}</span></td>
            <td><button style="border:none; background:none; color:var(--primary); cursor:pointer;">View PDF</button></td>
        </tr>
    `).join('');
}
