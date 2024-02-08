import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton"
import Message from "./Message.jsx"
import useListenMessages from "../../hooks/useListenMessages";
const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	// console.log("messages", messages)
	const lastMessageRef = useRef();
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);
	return (
		<div className="px-4 flex-1 overflow-auto">
			{!loading && messages.length > 0 && messages.map((message) => (
				<div
					key={message._id}
					ref={lastMessageRef}
				>
					<Message message={message} />
				</div>
			))}

			{!loading && messages.length === 0 && (
				<p className="text-center">Send a Message to start the conversation</p>
			)}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
		</div>
	)
}

export default Messages;