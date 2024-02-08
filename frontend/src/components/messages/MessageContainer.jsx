import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import EmojiPicker from 'emoji-picker-react';
const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	useEffect(() => {
		return () => setSelectedConversation(null)
	}, [setSelectedConversation]);
	//the above code is for cleanup, that when the user logged out, he will have no user selected to chat

	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{!selectedConversation ? <NoChatSelected /> : (
				<>
					{/* Header */}
					<div className='bg-slate-700 px-6 py-3 flex'>
						<div className='w-10 rounded-full flex-col'>
							<img alt='User pic' src={selectedConversation.profilepic} />
						</div>
						<span className='text-white font-bold text-xl text-center ml-3 mt-1'>{selectedConversation.fullName}</span>
					</div>

					<Messages />
					<MessageInput />
				</>)}
		</div>
	);
};


const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

export default MessageContainer;