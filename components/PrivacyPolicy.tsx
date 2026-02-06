import React from 'react';
import { X, Shield, Lock, Eye, FileText, Server, Globe, UserCheck, AlertCircle } from 'lucide-react';

interface PrivacyPolicyProps {
    onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-white z-10">
                    <div className="flex items-center gap-2">
                        <Shield size={20} className="text-orange-500" />
                        <h2 className="font-display font-bold text-xl text-stone-800">Privacy Policy</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center hover:bg-stone-200 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-8 text-stone-600">

                    <div className="border-b border-stone-100 pb-6">
                        <h1 className="text-2xl font-bold text-stone-900 mb-2">Privacy Policy – Save a Turtle Initiative</h1>
                        <p className="text-sm font-medium text-stone-500">
                            Last Updated: 22 Jan 2026
                        </p>
                    </div>

                    <section className="space-y-3">
                        <h3 className="text-stone-900 font-bold text-lg flex items-center gap-2">
                            1. Introduction
                        </h3>
                        <p className="text-sm leading-relaxed text-justify">
                            This website is operated by the <strong>Save a Turtle Initiative</strong> (“we”, “us”, “our”) to enable participants to generate a customised pledge certificate and, where they choose, to receive information about similar conservation initiatives in the future. The initiative is a non‑cash, awareness‑driven effort to encourage people to take a pledge and participate, and is not linked to any monetary reward or benefit.
                        </p>
                        <p className="text-sm leading-relaxed text-justify">
                            This Privacy Policy explains how we collect, use, store, and protect your personal data. This document is an electronic record in terms of the Information Technology Act, 2000 and the rules made thereunder, including the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and is intended to align with applicable provisions of the Digital Personal Data Protection Act, 2023 (“DPDP Act”) and related rules, to the extent applicable.
                        </p>
                        <p className="text-sm leading-relaxed text-justify">
                            By using this website and providing your information, you agree to the terms of this Privacy Policy.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-stone-900 font-bold text-lg flex items-center gap-2">
                            <Lock size={18} className="text-sky-500" /> 2. Information We Collect
                        </h3>
                        <p className="text-sm leading-relaxed">
                            We only collect personal information that you voluntarily provide through the website form:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm bg-stone-50 p-4 rounded-lg border border-stone-100">
                            <li><strong>Name</strong> – used to personalise your turtle pledge certificate.</li>
                            <li><strong>Email address</strong> – used to send your certificate and, if you opt in, related updates.</li>
                            <li><strong>Phone number</strong> – used only if you opt in to receive communication (e.g., messages) about similar initiatives.</li>
                        </ul>
                        <p className="text-sm leading-relaxed">
                            We do not intentionally collect financial information, government ID numbers, passwords, or health data. If you do not provide consent (see Section 4), we do not store your name, email address, or phone number beyond what is technically necessary to generate your certificate in that session.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-stone-900 font-bold text-lg flex items-center gap-2">
                            <Eye size={18} className="text-sky-500" /> 3. Photographs and Local Processing
                        </h3>
                        <p className="text-sm leading-relaxed">
                            If the website allows you to add a photo to your pledge certificate:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Any photo you use is processed only locally in your browser to generate a preview and the final certificate.</li>
                            <li>The photo is not uploaded to our servers, not transmitted to our backend, and not stored in any database or log.</li>
                            <li>Once you close or refresh the browser tab or finish the session, the photo data is discarded by your browser.</li>
                        </ul>
                        <p className="text-sm font-medium text-stone-800 bg-sky-50 p-3 rounded-lg inline-block border border-sky-100">
                            In simple terms: we never receive or store your photo; it remains on your device only.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-stone-900 font-bold text-lg">
                            4. How We Use Your Information
                        </h3>
                        <p className="text-sm leading-relaxed">
                            We use your personal information strictly for the following purposes:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>To generate and provide your personalised turtle pledge certificate.</li>
                            <li>To send you information about similar campaigns, events, or civic initiatives only if you have expressly opted in to receive such communications.</li>
                        </ul>
                        <p className="text-sm leading-relaxed">
                            We do not sell, rent, trade, or otherwise commercially exploit your personal information. We do not use your data for unrelated profiling or targeted advertising.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-stone-900 font-bold text-lg flex items-center gap-2">
                            <UserCheck size={18} className="text-green-500" /> 5. Legal Basis and Consent
                        </h3>
                        <p className="text-sm leading-relaxed">
                            We process your personal data only where we have a lawful basis to do so, primarily:
                        </p>
                        <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                            <p className="text-sm leading-relaxed mb-2">
                                <strong>Consent:</strong> When you tick the consent checkbox or otherwise clearly indicate your agreement on the website form, you provide free, specific, informed and unambiguous consent for us to store and use your name, email and/or phone number for the limited purposes described above, consistent with the DPDP Act.
                            </p>
                            <p className="text-sm leading-relaxed">
                                <strong>If you do not opt in (i.e., you do not give consent):</strong>
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
                                <li>We do not store your name, email address, or phone number after the certificate is generated.</li>
                                <li>You may withdraw your consent at any time as described in Section 8.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-stone-900 font-bold text-lg flex items-center gap-2">
                            <Server size={18} className="text-indigo-500" /> 6. Data Storage, Retention and Security
                        </h3>
                        <p className="text-sm leading-relaxed text-justify">
                            If you provide consent, your name, email address and/or phone number are stored in our systems and are accessible only to authorised personnel or trusted service providers working under appropriate confidentiality obligations.
                        </p>
                        <p className="text-sm leading-relaxed text-justify">
                            We implement reasonable security practices and procedures, including technical and organisational safeguards, to protect your personal data against unauthorised access, alteration, disclosure or destruction, in line with Section 43A of the IT Act, the SPDI Rules 2011, and the general obligations under the DPDP Act.
                        </p>
                        <p className="text-sm leading-relaxed">
                            We retain your personal data only for as long as necessary for the purposes stated in this Policy, or as required by law, or until you withdraw consent or request deletion, whichever is earlier.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-stone-900 font-bold text-lg">
                            7. Cookies and Technical Information
                        </h3>
                        <p className="text-sm leading-relaxed">
                            The website may use cookies or similar technologies to ensure proper functioning, maintain session state, prevent misuse, and collect aggregate usage statistics. These cookies are not used for cross‑site behavioural advertising. You can disable cookies through your browser settings; however, some features of the site may not function correctly if cookies are disabled.
                        </p>
                        <p className="text-sm leading-relaxed">
                            We may collect limited technical information such as IP address, browser type and pages visited for security and aggregate analytics, without attempting to uniquely identify you except where reasonably necessary to prevent fraud, abuse or security incidents.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-stone-900 font-bold text-lg">
                            8. Your Rights: Access, Correction and Deletion
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Subject to applicable law, you have the right to:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Access the personal data we hold about you.</li>
                            <li>Correct inaccurate or incomplete personal data.</li>
                            <li>Withdraw your consent to our use of your personal data.</li>
                            <li>Request deletion of your stored personal data where it is no longer required for the purposes described in this Policy or required to be retained by law.</li>
                        </ul>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-2">
                            <p className="text-sm leading-relaxed">
                                To exercise any of these rights, or to request that we stop using your data, you can contact us at: <br />
                                <span className="font-bold text-blue-700">support@comcommunity.co.in</span>
                            </p>
                        </div>
                        <p className="text-sm leading-relaxed mt-2">
                            On receiving a valid and verifiable request, we will take reasonable steps to act on your request within a reasonable time frame, in accordance with applicable laws and our internal procedures. If you withdraw consent, we will cease processing your personal data for the purposes covered by that consent and will delete your stored personal data, except where retention is required by law or for legitimate legal purposes.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-stone-900 font-bold text-lg">
                            9. Sharing and Disclosure of Information
                        </h3>
                        <p className="text-sm leading-relaxed">
                            We may share your personal data only in the following limited circumstances:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>With service providers (such as email service or hosting providers) who assist us in operating the website or sending communications, under appropriate confidentiality and security obligations.</li>
                            <li>Where required by law, regulation, legal process, or enforceable governmental request, or to comply with an order of a court or competent authority.</li>
                            <li>Where necessary to protect our legal rights, property or safety, or that of our users or the public, consistent with the IT Act 2000 and other applicable laws.</li>
                        </ul>
                        <p className="text-sm leading-relaxed">
                            We do not disclose your personal information to third parties for their own marketing purposes.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-stone-900 font-bold text-lg">
                            10. Compliance with Indian Data Protection Laws
                        </h3>
                        <p className="text-sm leading-relaxed">
                            This Privacy Policy is intended to comply with:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>The Information Technology Act, 2000, including but not limited to Sections 43A, 72 and 72A, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</li>
                            <li>The Digital Personal Data Protection Act, 2023 and any rules framed thereunder, to the extent applicable, especially with respect to valid consent, security safeguards, storage limitation, and data principal rights.</li>
                        </ul>
                        <p className="text-sm leading-relaxed">
                            In the event of any conflict between this Policy and any mandatory requirements under applicable law, the latter will prevail.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-stone-900 font-bold text-lg">
                            11. Changes to this Privacy Policy
                        </h3>
                        <p className="text-sm leading-relaxed">
                            We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or the functionality of the website. When we do so, we will revise the “Last Updated” date at the top of this page. Your continued use of the website after any such changes will constitute your acknowledgement of the revised Policy.
                        </p>
                    </section>

                    <section className="space-y-3 border-t border-stone-100 pt-6">
                        <h3 className="text-stone-900 font-bold text-lg flex items-center gap-2">
                            <AlertCircle size={18} className="text-orange-500" /> 12. Contact and Grievance
                        </h3>
                        <p className="text-sm leading-relaxed">
                            If you have any questions, concerns, complaints or grievances regarding this Privacy Policy or our handling of your personal data, you may contact us at:
                        </p>
                        <div className="bg-stone-800 text-white p-6 rounded-xl mt-4">
                            <h4 className="font-bold text-lg mb-1">Save a Turtle</h4>
                            <p className="text-stone-300 text-sm mb-4">Privacy & Grievance Officer</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <Globe size={20} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Email Support</p>
                                    <p className="text-white font-medium">
                                        support@comcommunity.co.in
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-stone-500 mt-4">
                            If required under applicable law, we may designate a specific Grievance Officer and publish their name and contact details here. Until then, this email address will serve as the primary point of contact for privacy‑related matters.
                        </p>
                    </section>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-stone-100 bg-stone-50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-stone-800 text-white font-bold rounded-lg hover:bg-stone-900 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
