import { School, Submission, StudentData } from '../types';

// ==========================================
// CONFIGURATION
// ==========================================

const GOOGLE_SCRIPT_URL: string = "https://script.google.com/macros/s/AKfycbyrJiblH9WqPP2vIjTvM2yyW_kWvvEPUAK7wCptArPQNlc7XqclOgLWB09UcRxaGRmb/exec";
const BACKEND_API_URL: string = "";

// ==========================================
// CENTRAL SCHOOL CONFIGURATION
// ==========================================

const INITIAL_SCHOOLS: School[] = [
    {
        id: 'citizen',
        name: "My Pledge for India",
        location: "National",
        subLocation: "General Public",
        icon: "🇮🇳",
        logoUrl: "", // Empty in UI
        posterLogoUrl: "/assets/ezone_specialist.png", // Visible in Poster
        isActive: true,
        isFeatured: true,
        templateId: 'tricolor'
    },

    {
        id: 'vaels',
        name: "Vaels International School",
        location: "Chennai",
        subLocation: "Neelankarai & Injabakkam",
        icon: "🏫",
        logoUrl: "/assets/vis_final.png",
        isActive: true,
        isFeatured: true,
        templateId: 'tricolor',
        logoPosition: {
            left: "16.41%",
            top: "85.55%",
            width: "28.00%",
            height: "5.40%"
        }
    },
    {
        id: 'zimson',
        name: "Zimson Watches",
        location: "Chennai",
        subLocation: "Zimson Watches",
        icon: "⌚",
        logoUrl: "/assets/zimson.png",
        posterLogoUrl: "/assets/zimson.png",
        isActive: true,
        isFeatured: true,
        templateId: 'tricolor',
        logoPosition: {
            left: "27.5%",
            top: "85.25%",
            width: "16.50%",
            height: "auto"
        }
    },
    {
        id: 'pachaiyappas',
        name: "Pachaiyappa's College",
        location: "Kanchipuram",
        subLocation: "",
        icon: "🎓",
        logoUrl: "/assets/pachaiyappas.png",
        posterLogoUrl: "/assets/pachaiyappas.png",
        isActive: true,
        isFeatured: true,
        templateId: 'tricolor',
        logoPosition: {
            left: "34.90%",
            top: "85.73%",
            width: "7.75%",
            height: "auto"
        }
    },
    {
        id: 'hindustan-uni',
        name: "Hindustan Institute",
        location: "Chennai",
        subLocation: "",
        icon: "🎓",
        logoUrl: "/assets/hindustan_uni.jpg",
        posterLogoUrl: "/assets/hindustan_uni.jpg",
        isActive: true,
        isFeatured: true,
        templateId: 'tricolor',
        logoPosition: {
            left: "30%",
            top: "86.95%", // Moved down 0.10%
            width: "15%",
            height: "auto"
        }
    },
    {
        id: 'hindustan-intl',
        name: "Hindustan School",
        location: "Chennai",
        subLocation: "",
        icon: "🏫",
        logoUrl: "/assets/hindustan_intl.jpg",
        posterLogoUrl: "/assets/hindustan_intl.jpg",
        isActive: true,
        isFeatured: true,
        templateId: 'tricolor',
        logoPosition: {
            left: "29%",
            top: "86.5%",
            width: "17%",
            height: "auto"
        }
    },
    {
        id: 'kcg-tech',
        name: "KCG College of Technology",
        location: "Chennai",
        subLocation: "",
        icon: "⚙️",
        logoUrl: "/assets/kcg_tech.jpg",
        posterLogoUrl: "/assets/kcg_tech.jpg",
        isActive: true,
        isFeatured: true,
        templateId: 'tricolor',
        logoPosition: {
            left: "30%",
            top: "86%",
            width: "15%",
            height: "auto"
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
            posterDownloaded: false,
            optIn: data.optIn
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
                // Add Auth Token for Security
                const payload = {
                    ...newSubmission,
                    auth_token: import.meta.env.VITE_API_TOKEN || ''
                };

                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // Required for Google Apps Script
                    headers: { 'Content-Type': 'text/plain' }, // Using text/plain ensures e.postData.contents is populated without CORS preflight issues
                    body: JSON.stringify(payload)
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
