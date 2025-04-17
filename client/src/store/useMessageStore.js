import {create} from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios.js";
import useAuthStore from "./useAuthStore.js";

const useMessageStore = create((set, get) => ({
users: [],
messages: [],
isUsersLoading: false,
isMessageLoading: false,
isMessageSending: false,

isUserActive: null,

getUsers: async () => {
    set({isUsersLoading: true});
    try {
        const res = await axiosInstance.get("/messages/users");
        set({users: res.data});
    } catch (error) {
        toast.error(error.response.data.message, {
              style: {
                border: "1px solid #d08e17",
                padding: "16px",
                color: "#713200",
              },
              iconTheme: {
                primary: "#713200",
                secondary: "#FFFAEE",
              },});
    }finally{
        set({isUsersLoading: false});
    }
},

userActive: (user) => {
    set({isUserActive: user});
},

getMessages: async (user_Id) => {
    set({isMessageLoading: true});
    try {
        const res = await axiosInstance.get(`/messages/${user_Id}`);
        set({messages: res.data});
        console.log("messages:", res.data);

    } catch (error) {
        toast.error(error.response.data.message, {
              style: {
                border: "1px solid #d08e17",
                padding: "16px",
                color: "#713200",
              },
              iconTheme: {
                primary: "#713200",
                secondary: "#FFFAEE",
              },});
    }finally{
        set({isMessageLoading: false});
    }
},

sendMessage: async (formData) => {
  const {isUserActive, messages} = get();
  set({ isMessageSending : true});
  try {
    const res = await axiosInstance.post(`/messages/send/${isUserActive._id}`, formData);
    set({messages: [...messages, res.data]})
  } catch (error) {
    toast.error(error.response.data.message, {
          style: {
            border: "1px solid #d08e17",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },});
  }finally{
    set({ isMessageSending : false});
  }
},

subscribeToMessages: () => {
  const {isUserActive} = get();
  if(!isUserActive) return;

  const socket = useAuthStore.getState().socket;

  socket.on("newMessage", (newMessage) => {
    if (newMessage.senderId !== isUserActive._id) return;

    set({messages: [...get().messages, newMessage]})
  }
)
},

unsubscribeFromMessages: () => {
  const socket = useAuthStore.getState().socket;
  socket.off("newMessage");
}


}));

export default useMessageStore;