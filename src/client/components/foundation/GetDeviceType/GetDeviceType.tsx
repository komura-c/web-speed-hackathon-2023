import { useEffect, useState } from 'react';
import type { FC , ReactNode } from 'react';

export const DeviceType = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
} as const;
export type DeviceType = typeof DeviceType[keyof typeof DeviceType];

type Props = {
  children: ({ deviceType }: { deviceType: DeviceType }) => ReactNode;
};

export const GetDeviceType: FC<Props> = ({children}: Props) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateWindow = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };
    if (!(typeof window === 'object')) {
      return;
    }
    window.addEventListener("resize", updateWindow);

    return () => window.removeEventListener("resize", updateWindow) 
  }, []);

  return (
    <>
      {children({
        deviceType: windowWidth >= 1024 ? DeviceType.DESKTOP : DeviceType.MOBILE,
      })}
    </>
  )
}
