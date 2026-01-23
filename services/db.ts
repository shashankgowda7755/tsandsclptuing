import { School, Submission, StudentData } from '../types';

// ==========================================
// CONFIGURATION
// ==========================================

const GOOGLE_SCRIPT_URL: string = "";
const BACKEND_API_URL: string = "";

// ==========================================
// CENTRAL SCHOOL CONFIGURATION
// ==========================================

const INITIAL_SCHOOLS: School[] = [
    {
        id: '1',
        name: "Delhi Public School",
        location: "New Delhi",
        subLocation: "R.K. Puram",
        icon: "🏛️",
        logoUrl: "/assets/dps_logo.jpeg",
        isActive: true,
        isFeatured: false,
        templateId: 'tricolor'
    },
    {
        id: '2',
        name: "Kendriya Vidyalaya",
        location: "Bangalore",
        subLocation: "Hebbal",
        icon: "🏫",
        logoUrl: "/assets/kv_logo.png",
        isActive: true,
        isFeatured: false,
        templateId: 'tricolor'
    },
    {
        id: '3',
        name: "National Public School",
        location: "Indiranagar",
        subLocation: "Bangalore",
        icon: "🎓",
        logoUrl: "/assets/nps_logo.jpeg",
        isActive: true,
        isFeatured: false,
        templateId: 'tricolor'
    },
    {
        id: '4',
        name: "Vales International School",
        location: "Chennai",
        subLocation: "Neelankarai",
        icon: "🏫",
        logoUrl: "/assets/VIS_NEELANKARAI_LOGO.jpg",
        isActive: true,
        isFeatured: true,
        templateId: 'tricolor',
        logoPosition: {
            left: "13.685%",
            top: "85.725%",
            width: "28.96%",
            height: "4.725%"
        }
    }
];

const STORAGE_KEYS = {
    SCHOOLS: 'communitree_schools',
    SUBMISSIONS: 'communitree_submissions'
};

// ==========================================
// UUID GENERATOR (Cross-browser compatible)
// ==========================================

const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // Fallback for older browsers
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// ==========================================
// MAIN DATABASE SERVICE
// ==========================================

export const DB = {

    // ========================================
    // SCHOOL MANAGEMENT
    // ========================================

    getSchools: (): School[] => {
        // Always save to localStorage for persistence
        localStorage.setItem(STORAGE_KEYS.SCHOOLS, JSON.stringify(INITIAL_SCHOOLS));
        return INITIAL_SCHOOLS;
    },

    getSchoolById: (id: string): School | undefined => {
        return INITIAL_SCHOOLS.find(s => s.id === id);
    },

    // ========================================
    // FORM SUBMISSION (Primary Logic)
    // ========================================

    submitForm: async (schoolId: string, data: StudentData): Promise<Submission> => {
        const school = INITIAL_SCHOOLS.find(s => s.id === schoolId);

        // Create submission object
        const newSubmission: Submission = {
            id: generateId(),
            schoolId,
            schoolName: school?.name || 'Unknown School',
            studentName: data.name,
            grade: data.grade || '',
            section: data.section || '',
            phone: data.phone,
            email: data.email,
            timestamp: new Date().toISOString(),
            posterGenerated: true,
            posterDownloaded: false
        };

        // ========================================
        // TIER 1: LOCAL STORAGE (Always runs)
        // ========================================
        try {
            const submissions = DB.getSubmissions();
            submissions.push(newSubmission);
            localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
            console.log("✅ Saved to LocalStorage");
        } catch (e) {
            console.error("❌ LocalStorage Error:", e);
        }

        // ========================================
        // TIER 2: GOOGLE SHEETS (If configured)
        // ========================================
        if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL.startsWith('http')) {
            try {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Required for Google Apps Script
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newSubmission)
                });
                console.log("✅ Sent to Google Sheets");
            } catch (error) {
                console.error("❌ Google Script Error:", error);
            }
        }

        // ========================================
        // TIER 3: BACKEND API (If configured)
        // ========================================
        if (BACKEND_API_URL && BACKEND_API_URL.startsWith('http')) {
            try {
                await fetch(BACKEND_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newSubmission)
                });
                console.log("✅ Sent to Backend API");
            } catch (error) {
                console.error("❌ Backend API Error:", error);
            }
        }

        return newSubmission;
    },

    // ========================================
    // RETRIEVAL & ANALYTICS
    // ========================================

    getSubmissions: (): Submission[] => {
        const stored = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
        return stored ? JSON.parse(stored) : [];
    },

    logDownload: (submissionId: string) => {
        const submissions = DB.getSubmissions();
        const index = submissions.findIndex(s => s.id === submissionId);
        if (index !== -1) {
            submissions[index].posterDownloaded = true;
            localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
        }
    },

    // ========================================
    // CSV EXPORT (For admin use)
    // ========================================

    exportData: (): string => {
        const submissions = DB.getSubmissions();
        const headers = [
            'Submission ID', 'Organization/School', 'Name',
            'Class', 'Section', 'Phone', 'Email',
            'Date', 'Downloaded'
        ];
        const rows = submissions.map(s => [
            s.id,
            s.schoolName,
            s.studentName,
            s.grade || '-',
            s.section || '-',
            s.phone,
            s.email,
            new Date(s.timestamp).toLocaleString(),
            s.posterDownloaded ? 'Yes' : 'No'
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        return csvContent;
    }
};
