export function Post(props) {
  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">by くるしば</h3>
      <p className="text-gray-700">プログラミングの勉強たのしー！</p>
      <button className="text-blue-500 hover:underline cursor-pointer focus:outline-none">
        削除
      </button>
    </div>
  );
}
