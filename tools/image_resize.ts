// import fg from 'fast-glob';
// import sharp from 'sharp';

// fg('./public/images/avatars/*.jpg').then((strings)=>{
//   strings.map(async path => {
//     await sharp(path)
//       .resize(104, 104)
//       .png({ quality: 30 })
//       .toFile(path + '_fixed');
//   })
// })

// fg('./public/images/products/tomato/*.jpg').then((strings)=>{
//   strings.map(async path => {
//     await sharp(path)
//       .resize(480, 240)
//       .png({ quality: 30 })
//       .toFile('./compressed' + path.slice(1));
//   })
// })
