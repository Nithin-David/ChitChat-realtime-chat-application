import React, { useRef, useState } from "react";
import { Images, Send, X } from "lucide-react";
import useMessageStore from "../store/useMessageStore";

const ChatInput = () => {
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const { sendMessage, isMessageSending } = useMessageStore();


  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removePreview = () => {
    setImagePreview(null);
    fileInputRef.current.value = null;
  }

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result); // base64 string
        setImagePreview(reader.result); // also use for preview
      };
      reader.readAsDataURL(file); // Convert to base64
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(!text.trim() && !base64Image) return;

    try {
      await sendMessage({ text: text.trim(), image: base64Image });

      setText("");
      setBase64Image(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = null; // reset input value
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col w-full my-4 mx-2 gap-2 relative">
      {/* 🖼️ Preview Box (top-left) */}
      {imagePreview && (
        <div className="absolute -top-24 left-0 p-1 rounded shadow-md bg-slate-800">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded"
            />
            <button
              onClick={removePreview}
              className="absolute top-0 right-0 h-5 w-5 bg-slate-700 flex items-center justify-center rounded-full">
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* 💬 Input Row */}
      <form
        onSubmit={handleFormSubmit}
        className="flex w-full items-center gap-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder={isMessageSending ? "Please wait message sending..." : "Type a message..."}
          className="outline-0 border w-full border-slate-700 px-2 py-2 rounded-lg ml-1"
        />

        {/* 📷 Image Upload Icon */}
        <div>
          <input
            ref={fileInputRef}
            onChange={handleFile}
            className="hidden"
            type="file"
            accept="image/*"
          />
          <Images onClick={handleClick} size={18} color="#ef8834" />
        </div>

        {/* 📨 Send Button */}
        <button
          type="submit"
          className="mr-2 h-5 w-5"
          disabled={(!text.trim() && !base64Image) || isMessageSending}>
          <Send
            size={18}
            color={
              (!text.trim() && !base64Image) || isMessageSending
                ? "#71461d"
                : "#ef8834"
            }
          />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
