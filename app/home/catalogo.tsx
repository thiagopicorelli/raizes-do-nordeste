export const PRODUCTS = [
  { id: 1,  category: 'tapiocas', available:['rj', 'sp'], name: 'Tapioca de Coco',             desc: 'Tapioca artesanal com coco fresco ralado na hora, levemente adocicada',                   price: 12, icon: 'ti-bread',      tag: 'Popular',      tagColor: 'amber' },
  { id: 2,  category: 'tapiocas', available:['recife', 'sp'], name: 'Tapioca de Queijo Coalho',    desc: 'Queijo coalho grelhado com fio generoso de manteiga de garrafa',                          price: 14, icon: 'ti-bread' },
  { id: 3,  category: 'tapiocas', available:['recife', 'rj', 'sp'], name: 'Tapioca de Frango',           desc: 'Frango desfiado temperado com catupiry cremoso e ervas frescas do sertão',                 price: 16, icon: 'ti-bread' },
  { id: 4,  category: 'tapiocas', available:['recife', 'sp'], name: 'Tapioca de Camarão',          desc: 'Camarão temperado com coentro e limão cravo, trazido direto do litoral cearense',         price: 22, icon: 'ti-bread',      tag: 'Especial',     tagColor: 'coral' },
  { id: 5,  category: 'cuscuz', available:['recife', 'rj', 'sp'],   name: 'Cuscuz com Carne de Sol',     desc: 'Cuscuz flocado com carne de sol dessalgada e manteiga de garrafa derretida',              price: 18, icon: 'ti-grain',      tag: 'Mais Pedido',  tagColor: 'amber' },
  { id: 6,  category: 'cuscuz', available:['recife', 'rj', 'sp'],   name: 'Cuscuz com Queijo Manteiga',  desc: 'Queijo manteiga nordestino derretido sobre cuscuz bem quentinho e flocado',               price: 15, icon: 'ti-grain' },
  { id: 7,  category: 'cuscuz', available:['recife', 'rj'],   name: 'Cuscuz com Ovo Mexido',       desc: 'Ovos caipiras mexidos com manteiga da terra, temperados com pimenta bode',                price: 13, icon: 'ti-egg' },
  { id: 8,  category: 'bolos', available:['recife', 'rj', 'sp'],    name: 'Bolo de Macaxeira Simples',   desc: 'Bolo úmido de macaxeira com coco ralado, receita da vovó passada de geração em geração',  price:  8, icon: 'ti-cake',       tag: 'Caseiro',      tagColor: 'green' },
  { id: 9,  category: 'bolos', available:['recife', 'rj', 'sp'],    name: 'Bolo de Macaxeira com Coco',  desc: 'Macaxeira fresca com coco úmido e cobertura de leite condensado artesanal',               price: 10, icon: 'ti-cake' },
  { id: 10, category: 'sucos', available:['recife', 'rj', 'sp'],    name: 'Suco de Cajá',                desc: 'Polpa natural de cajá batida na hora, gelado e sem conservantes ou adição de corantes',   price: 10, icon: 'ti-glass-full', tag: 'Regional',     tagColor: 'teal' },
  { id: 11, category: 'sucos', available:['rj', 'sp'],    name: 'Suco de Umbu',                desc: 'Fruta típica do sertão nordestino com sabor único, agridoce e muito refrescante',         price: 10, icon: 'ti-glass-full', tag: 'Regional',     tagColor: 'teal' },
  { id: 12, category: 'sucos', available:['recife', 'rj', 'sp'],    name: 'Suco de Seriguela',           desc: 'Cremoso e cítrico, feito com seriguela madura colhida fresquinha na roça',                price:  9, icon: 'ti-glass-full' },
  { id: 13, category: 'sucos', available:['recife', 'rj', 'sp'],    name: 'Suco de Acerola',             desc: 'Riquíssimo em vitamina C, preparado com acerola fresca do quintal da casa',               price:  9, icon: 'ti-glass-full' },
  { id: 14, category: 'cafe', available:['recife', 'rj', 'sp'],     name: 'Café Nordestino Completo',    desc: 'Tapioca + cuscuz + bolo de macaxeira + suco regional + café coado com leite',             price: 35, icon: 'ti-coffee',     tag: 'Completo',     tagColor: 'amber' },
  { id: 15, category: 'cafe', available:['recife', 'sp'],     name: 'Café da Manhã Simples',       desc: 'Tapioca ou cuscuz à escolha + suco natural gelado + café coado fresquinho',               price: 22, icon: 'ti-coffee' },
  { id: 16, category: 'cafe', available:['recife', 'rj', 'sp'],     name: 'Mesa Farta da Casa',          desc: '3 tapiocas variadas + 2 sucos + bolo + queijo coalho grelhado + café premium',           price: 55, icon: 'ti-coffee',     tag: 'Destaque',     tagColor: 'coral' },
];



export const CATEGORIES = [
  { id: 'todos',    label: 'Tudo',           icon: 'ti-layout-grid' },
  { id: 'tapiocas', label: 'Tapiocas',       icon: 'ti-bread' },
  { id: 'cuscuz',   label: 'Cuscuz',         icon: 'ti-grain' },
  { id: 'bolos',    label: 'Bolos',          icon: 'ti-cake' },
  { id: 'sucos',    label: 'Sucos',          icon: 'ti-glass-full' },
  { id: 'cafe',     label: 'Café da Manhã',  icon: 'ti-coffee' },
];

export const TAG_COLORS = {
  amber: { bg: '#FAEEDA', text: '#854F0B', border: '#FAC775' },
  coral: { bg: '#FAECE7', text: '#712B13', border: '#F5C4B3' },
  teal:  { bg: '#E1F5EE', text: '#085041', border: '#9FE1CB' },
  green: { bg: '#EAF3DE', text: '#27500A', border: '#C0DD97' },
};

export const CATEGORY_COLORS = {
  tapiocas: { bg: '#FAEEDA', accent: '#854F0B',  iconColor: '#BA7517' },
  cuscuz:   { bg: '#FAECE7', accent: '#712B13',  iconColor: '#993C1D' },
  bolos:    { bg: '#EAF3DE', accent: '#27500A',  iconColor: '#3B6D11' },
  sucos:    { bg: '#E1F5EE', accent: '#085041',  iconColor: '#0F6E56' },
  cafe:     { bg: '#F1EFE8', accent: '#444441',  iconColor: '#5F5E5A' },
};

export const UNIDADES = [
  { id: 'recife', label: 'Recife'},
  { id: 'rj', label: 'Rio de Janeiro'},
  { id: 'sp', label: 'São Paulo'},
];