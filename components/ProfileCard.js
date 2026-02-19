export default function ProfileCard({ user, posts }) {
  const totalLikes = posts.reduce((a, p) => a + p.likesCount, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 flex flex-wrap justify-between items-center gap-6">
      {/* Name + Email */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
        <p className="text-sm text-gray-500 mt-1">{user.email}</p>
      </div>

      {/* Stats */}
      <div className="flex gap-10">
        {[
          { label: 'Posts', value: posts.length },
          { label: 'Likes', value: totalLikes },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-2xl font-bold text-blue-600">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}