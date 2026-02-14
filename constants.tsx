
import React from 'react';

export const COLORS = {
  GROVE_GREEN: '#2d8a2d',
  BALLAS_PURPLE: '#800080',
  VAGOS_YELLOW: '#ffcc00',
  WASTED_RED: '#b30000',
  GOLD: '#ff9d00'
};

export const RADIO_STATIONS = [
  { name: 'Radio Los Santos', genre: 'West Coast Hip Hop', color: '#ff9d00' },
  { name: 'K-DST', genre: 'Classic Rock', color: '#8b4513' },
  { name: 'Playback FM', genre: 'Classic Hip Hop', color: '#556b2f' },
  { name: 'Radio X', genre: 'Alternative Rock', color: '#483d8b' },
  { name: 'K-Rose', genre: 'Country', color: '#deb887' }
];

export const MOCK_NEWS: any[] = [
  {
    id: '3',
    title: 'ESCÂNDALO EM LOS SANTOS: Verba de Revitalização de Ganton é Roubada',
    excerpt: 'Investigação revela que milhões destinados a obras sociais em Grove Street "desapareceram" em esquema político.',
    content: 'A Weasel News obteve documentos exclusivos que ligam o sumiço de $15 milhões do fundo municipal a contas fantasmas em Las Venturas. O esquema, apelidado de "Operação Greenback", sugere o envolvimento de assessores diretos da prefeitura e, possivelmente, de oficiais corruptos da unidade C.R.A.S.H. Moradores de Ganton planejam protestos em frente à delegacia central ainda hoje. CJ, representante da Grove Street Families, declarou: "Eles pensam que podem pisar na gente e sair impunes? Isso não vai ficar assim."',
    author: 'Weasel Insider',
    date: '16 de Outubro, 2024',
    category: 'POLITICS',
    imageUrl: 'https://picsum.photos/seed/gtapolitics/800/400'
  },
  {
    id: '1',
    title: 'Novo Mod Gráfico Revoluciona Los Santos em 2024',
    excerpt: 'Um novo pack de texturas ultra-realistas traz o clássico de 2004 para a nova geração.',
    content: 'A comunidade de modding não para. Recentemente, um grupo de desenvolvedores independentes lançou o "San Andreas Definitive Plus", um mod que corrige bugs da versão oficial da Rockstar e adiciona Ray Tracing em tempo real.',
    author: 'Big Smoke',
    date: '15 de Outubro, 2024',
    category: 'MODS',
    imageUrl: 'https://picsum.photos/seed/gtamod/800/400'
  },
  {
    id: '2',
    title: 'Recorde Mundial de Speedrun é Batido após 2 Anos',
    excerpt: 'O runner "LSPD_Escaper" conseguiu baixar o tempo da categoria Any% em 45 segundos.',
    content: 'Utilizando um novo glitch de teletransporte próximo a San Fierro, o runner conseguiu completar a história principal em tempo recorde.',
    author: 'The Truth',
    date: '12 de Outubro, 2024',
    category: 'SPEEDRUN',
    imageUrl: 'https://picsum.photos/seed/gtaspeed/800/400'
  }
];
