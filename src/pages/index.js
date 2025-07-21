export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
      <div className='max-w-md w-full mx-4'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300'>
          <div className='mb-6'></div>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>
            Xin Chào! 👋
          </h1>
        </div>

        <div className='space-y-4'>
          <div className='bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-lg'>
            <p className='font-semibold'>🚀 Next.js + Tailwind CSS</p>
          </div>

          <div className='flex justify-center space-x-4 text-sm text-gray-500'>
            <span className='flex items-center'>
              <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
              TypeScript
            </span>
            <span className='flex items-center'>
              <span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
              React Query
            </span>
            <span className='flex items-center'>
              <span className='w-2 h-2 bg-purple-500 rounded-full mr-2'></span>
              Axios
            </span>
          </div>
        </div>

        <div className='mt-8 pt-6 border-t border-gray-200'>
          <p className='text-gray-500 text-sm'>
            Built with ❤️ using modern web technologies
          </p>
        </div>
      </div>
    </div>
  );
}
