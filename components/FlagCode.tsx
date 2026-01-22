import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, ExternalLink, Check, X, AlertTriangle, Flame, Shovel } from 'lucide-react';

const FAQS = [
    {
        question: "Can schools display the Indian flag every day?",
        answer: "Yes. If a school has a flagpole, it may display the Indian flag every day, provided the flag is in good condition and there is proper lighting if it remains displayed at night.",
        source: "pw",
        link: "https://www.pw.live/upsc/exams/flag-code-of-india-2002"
    },
    {
        question: "What should we do if the flag accidentally touches the ground?",
        answer: "Do not panic. Simply pick it up respectfully, check it for damage, and if it is still in good condition, it can continue to be displayed.",
        source: "indianexpress",
        link: "https://indianexpress.com/article/explained/how-to-store-tricolour-national-flag-code-rules-8093006/"
    },
    {
        question: "Can we hoist the flag on rainy days?",
        answer: "It is better to avoid hoisting the flag during heavy rain to prevent damage. If the flag is already displayed, bring it down safely.",
        source: "vajiramandravi",
        link: "https://vajiramandravi.com/current-affairs/flag-code-of-india-2002/"
    },
    {
        question: "Who can dispose of a damaged flag?",
        answer: "Any citizen or school can dispose of a damaged flag respectfully at home or in a school. It is not necessary to contact officials, but the disposal must follow the rules of burning or burial in private.",
        source: "indiatoday",
        link: "https://www.indiatoday.in/information/story/lmc-guidelines-on-national-flag-code-how-to-dispose-of-tricolour-properly-1987573-2022-08-13"
    },
    {
        question: "What if we don't have a fire or private space for burning?",
        answer: "Burial is an acceptable alternative. Place the folded flag in a box and bury it in a clean, private location with respect.",
        source: "indiatoday",
        link: "https://www.indiatoday.in/information/story/lmc-guidelines-on-national-flag-code-how-to-dispose-of-tricolour-properly-1987573-2022-08-13"
    },
    {
        question: "Can students take photos with the flag?",
        answer: "Yes, as long as the flag is displayed respectfully and the photos do not mock or insult the flag.",
        source: "thestatesman",
        link: "https://www.thestatesman.com/india/independence-day-2025-tricolour-rules-dos-and-donts-every-indian-must-know-1503470781.html"
    },
    {
        question: "Is it illegal to disrespect the flag?",
        answer: "Yes. The Prevention of Insults to National Honour Act, 1971 makes intentional disrespect of the flag a criminal offence.",
        source: "mha.gov",
        link: "https://www.mha.gov.in/en/documents/national-flag-emblem-anthem"
    }
];

const REFERENCES = [
    {
        title: "Flag Code of India, 2002 (as amended in 2021 & 2022)",
        desc: "Full official rules for the design, display, use, and care of the Indian flag.",
        source: "Ministry of Home Affairs (MHA)",
        link: "https://www.mha.gov.in/sites/default/files/FlagCode_18072023_0.pdf"
    },
    {
        title: "Frequently Asked Questions (FAQs) – Indian National Flag",
        desc: "Official Q&A on flag materials, sizes, display, and citizen use.",
        source: "Ministry of Home Affairs (MHA)",
        link: "https://www.mha.gov.in/sites/default/files/FAQ_18072023.pdf"
    },
    {
        title: "Salient features of the Flag Code of India, 2002",
        desc: "Short summary of key rules and practices.",
        source: "Press Information Bureau (PIB)",
        link: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1849012"
    },
    {
        title: "Prevention of Insults to National Honour Act, 1971",
        desc: "Law defining criminal offences related to disrespect of the national flag, Constitution, and anthem.",
        source: "Ministry of Home Affairs (MHA)",
        link: "https://www.mha.gov.in/en/documents/national-flag-emblem-anthem"
    },
    {
        title: "National Flag, Emblem & Anthem – Document Hub",
        desc: "Central government page listing all official documents, circulars, and orders on the Indian flag.",
        source: "Ministry of Home Affairs (MHA)",
        link: "https://www.mha.gov.in/en/documents/national-flag-emblem-anthem"
    },
    {
        title: "Frequently Asked Questions – Har Ghar Tiranga",
        desc: "Citizen-friendly FAQ booklet on hoisting the Indian flag at home.",
        source: "PIB / Ministry of Culture",
        link: "https://dghindia.gov.in/assets/downloads/62ea680a245a7faqsharghartiranga.pdf"
    },
    {
        title: "FAQ Booklet – Flag Code of India and its FAQ",
        desc: "Comprehensive FAQ document combining Flag Code rules and citizen questions.",
        source: "CG Publications",
        link: "http://www.cgspublicationindia.com/PDFOM/Flag%20Code%20of%20India%20&%20its%20FAQ.pdf"
    },
    {
        title: "Wikipedia – Flag Code of India",
        desc: "Neutral, detailed overview of the Flag Code history and provisions.",
        source: "Wikipedia",
        link: "https://en.wikipedia.org/wiki/Flag_Code_of_India"
    }
];

export const FlagCode: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-16 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-saffron/10 rounded-full mb-6">
                        <BookOpen className="text-saffron" size={32} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-indiaNavy mb-6 tracking-tight">
                        Indian Flag: Code of Conduct
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-saffron via-stone-200 to-indiaGreen mb-8 border border-stone-200"></div>

                    <p className="text-lg text-stone-700 max-w-2xl leading-relaxed">
                        The Indian flag is governed by the <strong>Flag Code of India, 2002</strong> and the <strong>Prevention of Insults to National Honour Act, 1971</strong>. This section provides complete guidance on how to properly use, respect, store, and dispose of the Indian flag in line with official rules.
                    </p>
                </div>

                <div className="space-y-16">
                    {/* 1. Design & Specification */}
                    <section>
                        <h3 className="text-2xl font-bold text-indiaNavy mb-6 flex items-center gap-3">
                            <span className="bg-saffron/10 text-saffron w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                            The Indian Flag: Design & Specification
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                                <h4 className="font-bold text-stone-900 mb-3">Official Design</h4>
                                <p className="text-sm text-stone-700">Three equal horizontal bands: <strong className="text-orange-600">Saffron (top)</strong>, White (middle), and <strong className="text-green-600">Green (bottom)</strong>. Centre has the <strong>Ashoka Chakra</strong> (navy blue wheel with 24 spokes).</p>
                            </div>
                            <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                                <h4 className="font-bold text-stone-900 mb-3">Permitted Materials</h4>
                                <p className="text-sm text-stone-700 mb-2"><strong>Natural or semi-natural fibres</strong>: Cotton, Polyester, Wool, Silk, Khadi.</p>
                            </div>
                        </div>
                    </section>

                    {/* 2. How to Use */}
                    <section>
                        <h3 className="text-2xl font-bold text-indiaNavy mb-6 flex items-center gap-3">
                            <span className="bg-indiaNavy/10 text-indiaNavy w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            How to use the Indian flag
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                                <div className="flex items-center gap-2 mb-4 text-indiaGreen font-bold text-lg">
                                    <Check size={24} /> Do
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        "Hoist with saffron band always on top.",
                                        "Display in a position of prominence and respect.",
                                        "Ensure flag is clean, bright, and undamaged.",
                                        "Fly upright and fully unfurled.",
                                        "Use a proper flag staff or stand.",
                                        "Display on all days if proper facilities exist.",
                                        "Place at centre/highest point if with other flags."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 text-stone-700 text-sm">
                                            <span className="text-indiaGreen mt-1">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                                <div className="flex items-center gap-2 mb-4 text-danger font-bold text-lg">
                                    <X size={24} /> Don't
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        "Don't display torn, faded, or damaged flags.",
                                        "Don't fly on the same pole as another flag.",
                                        "Don't place anything above or in front of the flag.",
                                        "Don't use covering for stages, podiums, or vehicles."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 text-stone-700 text-sm">
                                            <span className="text-danger mt-1">✗</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 3. Handling and Care */}
                    <section>
                        <h3 className="text-2xl font-bold text-indiaNavy mb-6 flex items-center gap-3">
                            <span className="bg-indiaNavy/10 text-indiaNavy w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            How to respect the Indian flag
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                                <div className="flex items-center gap-2 mb-4 text-indiaGreen font-bold text-lg">
                                    <Check size={24} /> Do
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        "Handle with clean hands and respect.",
                                        "Never let it touch ground, floor, or water.",
                                        "Fold properly using official method.",
                                        "Store in a clean, dry place.",
                                        "Keep paper/cloth flags safe; don't leave lying around.",
                                        "Collect and store flags after events."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 text-stone-700 text-sm">
                                            <span className="text-green-500 mt-1">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                                <div className="flex items-center gap-2 mb-4 text-danger font-bold text-lg">
                                    <X size={24} /> Don't
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        "Don't print words, logos, or images on the flag.",
                                        "Don't write or stick anything on the flag.",
                                        "Don't use as clothing, costume, or accessory.",
                                        "Don't use as cushion, napkin, or decor.",
                                        "Don't use for commercial ads or branding.",
                                        "Don't use on private vehicles without permission."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-3 text-stone-700 text-sm">
                                            <span className="text-red-500 mt-1">✗</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 4. What counts as disrespect */}
                    <section className="bg-orange-50/50 border border-saffron/10 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-indiaNavy mb-4 flex items-center gap-2">
                            <AlertTriangle className="text-saffron" />
                            What counts as disrespect?
                        </h3>
                        <p className="text-orange-800 text-sm mb-4">The <strong>Prevention of Insults to National Honour Act, 1971</strong> makes these actions illegal:</p>
                        <ul className="grid md:grid-cols-2 gap-4">
                            {[
                                "Intentionally burning, tearing, or trampling the flag in public.",
                                "Using the flag to insult or mock the nation.",
                                "Desecrating the flag with hate speech.",
                                "Displaying the flag to deliberately reduce its dignity."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-2 items-start text-orange-950 text-sm">
                                    <span className="mt-1.5 w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 5. Disposal */}
                    <section>
                        <h3 className="text-2xl font-bold text-indiaNavy mb-6 flex items-center gap-3">
                            <span className="bg-stone-200 text-stone-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                            How to dispose of a damaged flag
                        </h3>
                        <p className="text-stone-700 mb-6">Dispose only when ripped, soiled, faded, or unfit for display.</p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="group hover:bg-stone-50 transition-colors p-6 rounded-2xl border border-stone-200">
                                <div className="w-12 h-12 bg-saffron/10 rounded-xl flex items-center justify-center mb-4 text-saffron">
                                    <Flame size={24} />
                                </div>
                                <h4 className="font-bold text-lg text-stone-900 mb-2">Method 1: Respectful Burning</h4>
                                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4">Preferred Method</p>
                                <ol className="space-y-2 text-sm text-stone-700 list-decimal ml-4">
                                    <li>Fold the damaged flag neatly.</li>
                                    <li>Choose a private, clean, secure location.</li>
                                    <li>Build a fire (don't start it with the flag).</li>
                                    <li>Place folded flag in center of flames.</li>
                                    <li>Observe silence/respect while it burns completely.</li>
                                </ol>
                            </div>

                            <div className="group hover:bg-stone-50 transition-colors p-6 rounded-2xl border border-stone-200">
                                <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-4 text-stone-600">
                                    <Shovel size={24} />
                                </div>
                                <h4 className="font-bold text-lg text-stone-900 mb-2">Method 2: Respectful Burial</h4>
                                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4">Alternative Method</p>
                                <ol className="space-y-2 text-sm text-stone-700 list-decimal ml-4">
                                    <li>Fold the damaged flag neatly.</li>
                                    <li>Place in a clean wooden box or cloth container.</li>
                                    <li>Select a clean, private location.</li>
                                    <li>Bury the box containing the flag.</li>
                                    <li>Maintain respect and silence.</li>
                                </ol>
                            </div>
                        </div>

                        <div className="bg-danger/5 border border-danger/10 rounded-xl p-5">
                            <h4 className="font-bold text-danger mb-2 flex items-center gap-2 text-sm"><X size={16} /> What NOT to do</h4>
                            <p className="text-sm text-danger/80">Never throw in dustbins/trash. Never leave on streets or playgrounds. Never tear into pieces before disposal (burn/bury as a whole).</p>
                        </div>
                    </section>

                    {/* 6. Participation */}
                    <section>
                        <h3 className="text-2xl font-bold text-indiaNavy mb-6">How Schools Can Participate</h3>
                        <div className="bg-[#1c1917] rounded-3xl p-8 md:p-12 relative overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-white font-bold text-sm">1</span>
                                    </div>
                                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                                        <strong className="text-white">Hoist the Flag</strong> on a dedicated flagpole with ceremony.
                                    </p>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-white font-bold text-sm">4</span>
                                    </div>
                                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                                        <strong className="text-white">Collect Damaged Flags</strong> after events for respectful disposal.
                                    </p>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-white font-bold text-sm">2</span>
                                    </div>
                                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                                        <strong className="text-white">Teach Students</strong> the Flag Code and etiquette.
                                    </p>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-white font-bold text-sm">5</span>
                                    </div>
                                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                                        <strong className="text-white">Organise Awareness</strong> sessions for students and parents.
                                    </p>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-white font-bold text-sm">3</span>
                                    </div>
                                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                                        <strong className="text-white">Create Pledge Posters</strong> using this tool.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 7. FAQs */}
                    <section>
                        <h3 className="text-2xl font-bold text-indiaNavy mb-8">Frequently Asked Questions</h3>
                        <div className="grid gap-3">
                            {FAQS.map((faq, index) => (
                                <div key={index} className={`border border-stone-200 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-stone-50 ring-1 ring-stone-200' : 'bg-white hover:border-stone-300'}`}>
                                    <button onClick={() => toggleFAQ(index)} className="w-full flex items-center justify-between p-4 text-left focus:outline-none">
                                        <span className={`font-semibold text-sm md:text-base ${openIndex === index ? 'text-indiaNavy' : 'text-stone-800'}`}>{faq.question}</span>
                                        {openIndex === index ? <ChevronUp className="text-indiaNavy shrink-0 ml-4" size={18} /> : <ChevronDown className="text-stone-400 shrink-0 ml-4" size={18} />}
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="p-4 pt-0 text-stone-700 text-sm leading-relaxed border-t border-stone-200/50 mt-1">
                                            {faq.answer}
                                            <div className="mt-2 text-xs text-stone-400 flex items-center gap-1">
                                                Source: <a href={faq.link} target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline">{faq.source}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 8. Official References */}
                    <section>
                        <h3 className="text-2xl font-bold text-indiaNavy mb-6 border-b border-stone-200 pb-4">Official References</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            {REFERENCES.map((ref, i) => (
                                <a key={i} href={ref.link} target="_blank" rel="noreferrer" className="group block p-5 rounded-xl border border-stone-200 hover:border-blue-300 hover:shadow-sm transition-all bg-white">
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            {ref.source}
                                        </span>
                                        <ExternalLink size={14} className="text-stone-300 group-hover:text-blue-400" />
                                    </div>
                                    <h4 className="font-bold text-stone-900 group-hover:text-blue-700 transition-colors mb-1 leading-tight">{ref.title}</h4>
                                    <p className="text-xs text-stone-600 line-clamp-2">{ref.desc}</p>
                                </a>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </section>
    );
};
