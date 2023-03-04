type FontFaceSource = {
  family: string;
  source: string;
  descripter: FontFaceDescriptors;
};

const FONT_FACE_SOURCES: FontFaceSource[] = [
  {
    descripter: {
      display: 'swap',
      style: 'normal',
      weight: '700',
    },
    family: 'Noto Serif JP',
    source: "url('/fonts/NotoSerifJP-Bold.otf')",
  },
  {
    descripter: {
      display: 'swap',
      style: 'normal',
      weight: '400',
    },
    family: 'Noto Serif JP',
    source: "url('/fonts/NotoSerifJP-Regular.otf')",
  },
];

export async function loadFonts() {
  for (const { descripter, family, source } of FONT_FACE_SOURCES) {
    document.fonts.add(new FontFace(family, source, descripter));
  }
}
