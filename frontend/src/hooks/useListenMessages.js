import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";
import toast from "react-hot-toast";


const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages, selectedConversation } = useConversation();
	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			const sound = new Audio(notificationSound);
			sound.play();
			toast('New Message', {
				icon: '💬',
				style: {
					borderRadius: '10px',
					background: '#333',
					color: '#fff',
				},
			});

			if (selectedConversation && newMessage.senderId === selectedConversation._id) {
				newMessage.shouldShake = true;
				setMessages([...messages, newMessage]);
			}
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages, selectedConversation]);
};
export default useListenMessages;