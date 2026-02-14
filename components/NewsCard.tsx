
import React from 'react';
import { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
  onClick: (news: NewsItem) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
  const isPolitics = news.category === 'POLITICS';

  return (
    <div 
      className={`group relative overflow-hidden rounded-xl bg-[#1a1a1a] border transition-all cursor-pointer shadow-xl ${
        isPolitics ? 'border-red-500/20 hover:border-red-500/50' : 'border-white/5 hover:border-green-500/50'
      }`}
      onClick={() => onClick(news)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border ${
          isPolitics ? 'bg-red-600/60 border-red-400/30' : 'bg-black/60 border-white/10'
        }`}>
          {news.category}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-gray-500 font-semibold uppercase">{news.date}</span>
          <span className={`text-[10px] font-bold uppercase ${isPolitics ? 'text-red-500' : 'text-green-500'}`}>
            {news.author}
          </span>
        </div>
        <h3 className={`text-xl font-bold mb-2 transition-colors leading-tight ${
          isPolitics ? 'group-hover:text-red-500' : 'group-hover:text-green-500'
        }`}>
          {news.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2">
          {news.excerpt}
        </p>
      </div>
      <div className={`absolute bottom-0 left-0 h-1 transition-all duration-300 group-hover:w-full w-0 ${
        isPolitics ? 'bg-red-500' : 'bg-green-500'
      }`}></div>
    </div>
  );
};

export default NewsCard;
