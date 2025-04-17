
import React from "react";
import ContactBar from "../components/ContactBar";
import ChatBar from "../components/ChatBar";
import useMessageStore from "../store/useMessageStore";
import WelcomeChatBar from "../components/WelcomeChatBar";

const HomePage = () => {
const {isUserActive} = useMessageStore()

  return (
    <div className="flex md:py-12  justify-center w-full min-h-[calc(100vh-3rem)]">
      <div className="flex max-w-6xl w-full md:max-h-[80vh] bg-[#161c26] py-2 px-4 md:rounded-lg">
        {/* left side */}
        <ContactBar />

        {/* right side */}
        {isUserActive ? <ChatBar /> : <WelcomeChatBar/>}
        
      </div>
    </div>
  );
};

export default HomePage;
