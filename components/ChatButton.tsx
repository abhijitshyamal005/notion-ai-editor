export default function ChatButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 w-12 h-12 bg-violet-600 text-white rounded-full shadow-lg"
        >
            💬
        </button>
    )
}
