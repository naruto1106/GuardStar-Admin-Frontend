import { useState } from "react";


const Alert = () => {

    const [pushNotification, setPushNotification] = useState(false);
    const [toPhone, setToPhone] = useState(false);
    const [toEmail, setToEmail] = useState(false);
    const [offline, setOffline] = useState(false);
    // Event handler to update checkbox value
    const handlePushNotification = (e) => {
        setPushNotification(e.target.checked);
    };
    const handleToPhone = (e) => {
        setToPhone(e.target.checked);
    };
    const handleToEmail = (e) => {
        setToEmail(e.target.checked);
    };
    const handleOffline = (e) => {
        setOffline(e.target.checked);
    };

    return (
        <>
            <h1 className="text-[28px] uppercase">Alert</h1>
            <div className="mt-[150px]">
                <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                                id="PushNotification"
                                name="PushNotification"
                                type="checkbox"
                                checked={pushNotification} // Set the checked attribute based on state
                                onChange={handlePushNotification} // Call the event handler when checkbox changes
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="PushNotification" className="font-medium text-[18px] text-gray-900">
                                Push Notification
                            </label>
                            <p className="text-gray-500">-App will send you a notification when the alert was triggerd.</p>
                        </div>
                    </div>
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                                id="toPhone"
                                name="toPhone"
                                type="checkbox"
                                checked={toPhone} // Set the checked attribute based on state
                                onChange={handleToPhone} // Call the event handler when checkbox changes
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="toPhone" className="font-medium text-[18px] text-gray-900">
                                By text message to Phone
                            </label>
                        </div>
                    </div>
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                                id="toEmail"
                                name="toEmail"
                                type="checkbox"
                                checked={toEmail} // Set the checked attribute based on state
                                onChange={handleToEmail} // Call the event handler when checkbox changes
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="toEmail" className="font-medium text-[18px] text-gray-900">
                                E-Mail
                            </label>
                        </div>
                    </div>
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                                id="offline"
                                name="offline"
                                type="checkbox"
                                checked={offline} // Set the checked attribute based on state
                                onChange={handleOffline} // Call the event handler when checkbox changes
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="offline" className="font-medium text-[18px] text-gray-900">
                                Hub Offline Notification (experimental)
                            </label>
                            <p className="text-gray-500">-App push notifications or Email alerts need to be turned on to receive the Hub offline notifications</p>
                        </div>
                    </div>
                    <div className="relative flex gap-x-3">
                        <div className="text-sm leading-6">
                            <label className="font-medium text-[18px] text-gray-900">
                                Beeping on the Hub
                            </label>
                            <p className="text-gray-500">-If you need to set the Hub beep, please go to the Sensor Settings page.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Alert