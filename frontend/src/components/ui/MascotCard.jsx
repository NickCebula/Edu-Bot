export default function MascotCard({ name, imgUrl, coins }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-64 text-center">
      <img src={imgUrl} alt={name} className="w-24 h-24 mx-auto mb-2 rounded-full border-4 border-brandPink" />
      <h2 className="text-xl font-comic text-brandBlue">{name}</h2>
      <p className="text-sm text-gray-600">Coins: {coins}</p>
    </div>
  );
}
