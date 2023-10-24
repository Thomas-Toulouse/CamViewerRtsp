import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation/screenAnimation";
import Checkbox from "../../components/checkBox/checkBox";
import { ICEServer } from "../../interfaces/IServer";

export default function WebrtcSetting({ settings, onSave, postSetting }) {
    const [webrtc, setWebrtc] = useState(settings.webrtc || true);
    const [webrtcDisabled, setWebrtcDisabled] = useState(
        settings.webrtcDisabled || false
    );
    const [webrtcAddress, setWebrtcAddress] = useState(
        settings.webrtcAddress || ":8889"
    );
    const [webrtcEncryption, setWebrtcEncryption] = useState(
        settings.webrtcEncryption || false
    );
    const [webrtcKey, setWebrtcKey] = useState(
        settings.webrtcKey || "server.key"
    );
    const [webrtcCert, setWebrtcCert] = useState(
        settings.webrtcCert || "server.crt"
    );
    const [webrtcAllowOrigin, setWebrtcAllowOrigin] = useState(
        settings.webrtcAllowOrigin || "*"
    );
    const [webrtcTrustedProxies, setWebrtcTrustedProxies] = useState(
        settings.webrtcTrustedProxies || []
    );
    const [webrtcICEServers, setWebrtcICEServers] = useState(
        settings.webrtcICEServers || null
    );
    const [webrtcICEServers2, setWebrtcICEServers2] = useState<ICEServer>(
        settings.webrtcICEServers2 || {
            url: "",
            username: "",
            password: ""
        }
    );
    const [webrtcICEHostNAT1To1IPs, setWebrtcICEHostNAT1To1IPs] = useState(
        settings.webrtcICEHostNAT1To1IPs || []
    );
    const [webrtcICEUDPMuxAddress, setWebrtcICEUDPMuxAddress] = useState(
        settings.webrtcICEUDPMuxAddress || ""
    );
    const [webrtcICETCPMuxAddress, setWebrtcICETCPMuxAddress] = useState(
        settings.webrtcICETCPMuxAddress || ""
    );

    const handleWebrtc = () => {
        setWebrtc(!webrtc);
    };

    const handleWebrtcDisabled = () => {
        setWebrtcDisabled(!webrtcDisabled);
    };

    const handleWebrtcAddress = (event) => {
        setWebrtcAddress(event.target.value);
    };

    const handleWebrtcEncryption = () => {
        setWebrtcEncryption(!webrtcEncryption);
    };

    const handleWebrtcKey = (event) => {
        setWebrtcKey(event.target.value);
    };

    const handleWebrtcCert = (event) => {
        setWebrtcCert(event.target.value);
    };

    const handleWebrtcAllowOrigin = (event) => {
        setWebrtcAllowOrigin(event.target.value);
    };

    const handleWebrtcTrustedProxies = (event) => {
        setWebrtcTrustedProxies(event.target.value);
    };

    const handleWebrtcICEServers = (event) => {
        setWebrtcICEServers(event.target.value);
    };

    const handleWebrtcICEServers2 = (event) => {
        setWebrtcICEServers2(event.target.value);
    };

    const handleWebrtcICEHostNAT1To1IPs = (event) => {
        setWebrtcICEHostNAT1To1IPs(event.target.value);
    };

    const handleWebrtcICEUDPMuxAddress = (event) => {
        setWebrtcICEUDPMuxAddress(event.target.value);
    };

    const handleWebrtcICETCPMuxAddress = (event) => {
        setWebrtcICETCPMuxAddress(event.target.value);
    };

    useEffect(() => {
        setWebrtc(settings.webrtc || true);
        setWebrtcDisabled(settings.webrtcDisabled || false);
        setWebrtcAddress(settings.webrtcAddress || ":8889");
        setWebrtcEncryption(settings.webrtcEncryption || false);
        setWebrtcKey(settings.webrtcKey || "server.key");
        setWebrtcCert(settings.webrtcCert || "server.crt");
        setWebrtcAllowOrigin(settings.webrtcAllowOrigin || "*");
        setWebrtcTrustedProxies(settings.webrtcTrustedProxies || []);
        setWebrtcICEServers(settings.webrtcICEServers || null);
        setWebrtcICEServers2(
            settings.webrtcICEServers2 || {
                url: "",
                username: "",
                password: ""
            }
        );
        setWebrtcICEHostNAT1To1IPs(settings.webrtcICEHostNAT1To1IPs || []);
        setWebrtcICEUDPMuxAddress(settings.webrtcICEUDPMuxAddress || "");
        setWebrtcICETCPMuxAddress(settings.webrtcICETCPMuxAddress || "");
    }, [settings]);

    const handleSaveConfig = () => {
        // Create an updated settings object with the modified logging settings
        const updatedSettings = {
            ...settings,
            webrtc: webrtc,
            webrtcDisabled: webrtcDisabled,
            webrtcAddress: webrtcAddress,
            webrtcEncryption: webrtcEncryption,
            webrtcKey: webrtcKey,
            webrtcCert: webrtcCert,
            webrtcAllowOrigin: webrtcAllowOrigin,
            webrtcTrustedProxies: webrtcTrustedProxies,
            webrtcICEServers: webrtcICEServers,
            webrtcICEServers2: webrtcICEServers2,
            webrtcICEHostNAT1To1IPs: webrtcICEHostNAT1To1IPs,
            webrtcICEUDPMuxAddress: webrtcICEUDPMuxAddress,
            webrtcICETCPMuxAddress: webrtcICETCPMuxAddress
        };
        onSave(updatedSettings);
        postSetting(updatedSettings);
    };

    return (
        <>
            <div className="w-3/4 mx-auto flex justify-center items-start min-h-screen">
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {settings && (
                        <div className="my-4 ">
                            <h2 className="text-center font-bold text-3xl">
                                Webrtc Setting
                            </h2>
                            <div className="grid grid-cols-2 content-between place-content-start mt-6 gap-4">
                                <div className="col-span-1">
                                    <div className="flex flex-col align-baseline text-justify items-end">
                                        <label className="my-2">Webrtc:</label>
                                        <label className="my-2">
                                            Webrtc Address:
                                        </label>
                                        <label className="my-2">
                                            Webrtc Encryption:
                                        </label>
                                        <label className="my-2">
                                            Webrtc Disabled:
                                        </label>
                                        <label className="my-3">
                                            Webrtc Server Key:
                                        </label>
                                        <label className="my-2">
                                            Webrtc Server Certificate:
                                        </label>
                                        <label className="my-3">
                                            Webrtc Allow Origin:
                                        </label>
                                        <label className="my-4">
                                            Webrtc Trusted Proxies:
                                        </label>
                                        <label className="my-6">
                                            Webrtc ICE Servers:
                                        </label>
                                        <label className="my-2">
                                            Webrtc ICE Servers2:
                                        </label>
                                        <label className="mt-56 mb-5">
                                            Webrtc ICE Host NAT 1 To 1 IPs:
                                        </label>
                                        <label className="my-4">
                                            Webrtc ICE UDP Mux Address:
                                        </label>
                                        <label className="my-2">
                                            Webrtc ICE TCP Mux Address:
                                        </label>
                                    </div>
                                </div>
                                <div className="col-span-1 mb-12">
                                    <div className="flex flex-col">
                                        <Checkbox
                                            className="my-3"
                                            value={webrtc.toString()}
                                            checked={webrtc}
                                            onChange={handleWebrtc}
                                        />

                                        <input
                                            type="text"
                                            className="appearance-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcAddress}
                                            onChange={handleWebrtcAddress}
                                        />
                                        <Checkbox
                                            className="my-3"
                                            value={webrtcDisabled.toString()}
                                            checked={webrtcDisabled}
                                            onChange={handleWebrtcDisabled}
                                        />
                                        <Checkbox
                                            className="my-3"
                                            value={webrtcEncryption.toString()}
                                            checked={webrtcEncryption}
                                            onChange={handleWebrtcEncryption}
                                        />
                                        <input
                                            type="text"
                                            className="appearance-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcKey}
                                            onChange={handleWebrtcKey}
                                        />
                                        <input
                                            type="text"
                                            className="appearance-none my-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcCert}
                                            onChange={handleWebrtcCert}
                                        />
                                        <input
                                            type="text"
                                            className="appearance-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcAllowOrigin}
                                            onChange={handleWebrtcAllowOrigin}
                                        />
                                        <textarea
                                            name="webrtcTrustedProxies"
                                            className="appearance-none resize-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcTrustedProxies}
                                            onChange={
                                                handleWebrtcTrustedProxies
                                            }
                                        />
                                        <textarea
                                            name="webrtcICEServers"
                                            className="appearance-none resize-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcICEServers}
                                            onChange={handleWebrtcICEServers}
                                        />
                                        <div className="my-6 mx-2">
                                            <label className="my-2 mx-2">
                                                URL:
                                            </label>
                                            <input
                                                title="url"
                                                type="text"
                                                className="appearance-none s my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                                value={webrtcICEServers2.url}
                                                onChange={
                                                    handleWebrtcICEServers2
                                                }
                                            />
                                            <label className="my-2 mx-2">
                                                Username:
                                            </label>
                                            <input
                                                title="username"
                                                type="text"
                                                className="appearance-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                                value={
                                                    webrtcICEServers2.username
                                                }
                                                onChange={
                                                    handleWebrtcICEServers2
                                                }
                                            />
                                            <label className="my-2 mx-2">
                                                Password:
                                            </label>
                                            <input
                                                title="password"
                                                type="text"
                                                className="appearance-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                                value={
                                                    webrtcICEServers2.password
                                                }
                                                onChange={
                                                    handleWebrtcICEServers2
                                                }
                                            />
                                        </div>
                                        <textarea
                                            name="webrtcICEHostNAT1To1IPs"
                                            className="appearance-none resize-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcICEHostNAT1To1IPs}
                                            onChange={
                                                handleWebrtcICEHostNAT1To1IPs
                                            }
                                        />
                                        <input
                                            type="text"
                                            className="appearance-none my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcICEUDPMuxAddress}
                                            onChange={
                                                handleWebrtcICEUDPMuxAddress
                                            }
                                        />
                                        <input
                                            type="text"
                                            className="appearance-none my-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mx-2"
                                            value={webrtcICETCPMuxAddress}
                                            onChange={
                                                handleWebrtcICETCPMuxAddress
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="my-6 flex justify-end fixed bottom-0 right-0">
                                <button
                                    type="button"
                                    className="dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 ml-4 font-bold py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="dark:text-text-dark text-text-light bg-accent-color1-700 hover:bg-accent-color1-800 mx-4 font-bold py-2 px-4 rounded"
                                    onClick={handleSaveConfig}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </>
    );
}
