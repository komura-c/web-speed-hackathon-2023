import fg from 'fast-glob';
import sharp from 'sharp';

// fg('./public/images/avatars/*.jpg').then((strings)=>{
//   strings.map(async path => {
//     await sharp(path)
//       .resize(104, 104)
//       .png({ quality: 30 })
//       .toFile(path + '_fixed');
//   })
// })

fg('./public/images/avatars/*.jpg').then((strings)=>{
  strings.map(async (path,index) => {
    await sharp(path)
      .resize(104, 104)
      .webp({ quality: 30 })
      .toFile('./public/compressed/avatars/' + String(index+1).padStart(3,'0') + '.webp');
  })
})
