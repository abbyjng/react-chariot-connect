import React, { useEffect } from 'react'

type ChariotConnectProps = {
    cid: string
}
const ChariotConnect: React.FC<ChariotConnectProps> = ({
    cid
}) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://cdn.givechariot.com/chariot-connect.umd.js";
        script.async = true;

        document.body.appendChild(script);

        const connect = document.createElement('chariot-connect') as any;
        connect.setAttribute('cid', cid);

        const connectContainer = document.getElementById('connectContainer');
        connectContainer?.appendChild(connect)

        const loadConnect = async () => {
            // wait for chariot.onDonationRequest to be available as a function
            while (typeof connect.onDonationRequest !== "function") {
                console.log(
                    "waiting for chariot.onDonationRequest to be available"
                );
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        }

        loadConnect();

        connect.onDonationRequest(async () => {
            return {};
        });

        return () => {
            document.body.removeChild(script);
            connectContainer?.removeChild(connect);
        }
    }, []);

    return (
        <div id="connectContainer">
        </div>
    )
}

export default ChariotConnect