import { Heading, Input, Link, Stack, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Inter } from "@next/font/google";
import { getChunkedColors, randomColors } from "@/utils/colors";
import { dValues } from "@/utils/svg";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [colors, setColors] = useState(randomColors());
  const linkRef = useRef(null);
  const canvasRef = useRef(null);

  const handleChange = async (e) => {
    const image = await createImageBitmap(e.target.files[0]);
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    setColors(
      getChunkedColors(ctx.getImageData(0, 0, canvas.width, canvas.height))
    );
  };

  const getSVGString = () => {
    const svgElement = document.querySelector("#result");
    return new XMLSerializer().serializeToString(svgElement);
  };

  const handleSVGDownload = () => {
    const svgBlob = new Blob([getSVGString()], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);
    linkRef.current.href = svgUrl;
    linkRef.current.download = "result.svg";
    linkRef.current.click();
  };

  const handlePNGDownload = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(getSVGString())}`;

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      linkRef.current.href = canvas.toDataURL("image/png");
      linkRef.current.download = "result.png";
      linkRef.current.click();
    };
  };

  return (
    <Stack
      className={inter.className}
      w="full"
      h="full"
      justify="center"
      align="center"
      p={16}
      spacing={16}
    >
      <Heading as="h1" size="4xl">
        Checksify
      </Heading>
      <Text>
        Upload a PNG/JPG image and get a SVG/PNG in the Checks format.
      </Text>
      <Input type="file" fontSize="2xl" onChange={handleChange} />
      <SVG rotatedArray={colors} />
      <Stack direction="row" align="center" justify="center" spacing={32}>
        <Link cursor="pointer" ref={linkRef} onClick={handleSVGDownload}>
          Download SVG
        </Link>
        <Link cursor="pointer" ref={linkRef} onClick={handlePNGDownload}>
          Download PNG
        </Link>
      </Stack>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Stack>
  );
}

const SVG = ({ rotatedArray }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="680"
      height="680"
      viewBox="0 0 680 680"
      fill="none"
      id="result"
    >
      <g clip-path="url(#clip0_1178_60295)">
        <path d="M680 0H0V680H680V0Z" fill="black" />
        <path d="M492 152H188V528H492V152Z" fill="#111111" />
        <path d="M232 160H196V196H232V160Z" stroke="#191919" />
        <path d="M268 160H232V196H268V160Z" stroke="#191919" />
        <path d="M304 160H268V196H304V160Z" stroke="#191919" />
        <path d="M340 160H304V196H340V160Z" stroke="#191919" />
        <path d="M376 160H340V196H376V160Z" stroke="#191919" />
        <path d="M412 160H376V196H412V160Z" stroke="#191919" />
        <path d="M448 160H412V196H448V160Z" stroke="#191919" />
        <path d="M484 160H448V196H484V160Z" stroke="#191919" />
        <path d="M232 196H196V232H232V196Z" stroke="#191919" />
        <path d="M268 196H232V232H268V196Z" stroke="#191919" />
        <path d="M304 196H268V232H304V196Z" stroke="#191919" />
        <path d="M340 196H304V232H340V196Z" stroke="#191919" />
        <path d="M376 196H340V232H376V196Z" stroke="#191919" />
        <path d="M412 196H376V232H412V196Z" stroke="#191919" />
        <path d="M448 196H412V232H448V196Z" stroke="#191919" />
        <path d="M484 196H448V232H484V196Z" stroke="#191919" />
        <path d="M232 232H196V268H232V232Z" stroke="#191919" />
        <path d="M268 232H232V268H268V232Z" stroke="#191919" />
        <path d="M304 232H268V268H304V232Z" stroke="#191919" />
        <path d="M340 232H304V268H340V232Z" stroke="#191919" />
        <path d="M376 232H340V268H376V232Z" stroke="#191919" />
        <path d="M412 232H376V268H412V232Z" stroke="#191919" />
        <path d="M448 232H412V268H448V232Z" stroke="#191919" />
        <path d="M484 232H448V268H484V232Z" stroke="#191919" />
        <path d="M232 268H196V304H232V268Z" stroke="#191919" />
        <path d="M268 268H232V304H268V268Z" stroke="#191919" />
        <path d="M304 268H268V304H304V268Z" stroke="#191919" />
        <path d="M340 268H304V304H340V268Z" stroke="#191919" />
        <path d="M376 268H340V304H376V268Z" stroke="#191919" />
        <path d="M412 268H376V304H412V268Z" stroke="#191919" />
        <path d="M448 268H412V304H448V268Z" stroke="#191919" />
        <path d="M484 268H448V304H484V268Z" stroke="#191919" />
        <path d="M232 304H196V340H232V304Z" stroke="#191919" />
        <path d="M268 304H232V340H268V304Z" stroke="#191919" />
        <path d="M304 304H268V340H304V304Z" stroke="#191919" />
        <path d="M340 304H304V340H340V304Z" stroke="#191919" />
        <path d="M376 304H340V340H376V304Z" stroke="#191919" />
        <path d="M412 304H376V340H412V304Z" stroke="#191919" />
        <path d="M448 304H412V340H448V304Z" stroke="#191919" />
        <path d="M484 304H448V340H484V304Z" stroke="#191919" />
        <path d="M232 340H196V376H232V340Z" stroke="#191919" />
        <path d="M268 340H232V376H268V340Z" stroke="#191919" />
        <path d="M304 340H268V376H304V340Z" stroke="#191919" />
        <path d="M340 340H304V376H340V340Z" stroke="#191919" />
        <path d="M376 340H340V376H376V340Z" stroke="#191919" />
        <path d="M412 340H376V376H412V340Z" stroke="#191919" />
        <path d="M448 340H412V376H448V340Z" stroke="#191919" />
        <path d="M484 340H448V376H484V340Z" stroke="#191919" />
        <path d="M232 376H196V412H232V376Z" stroke="#191919" />
        <path d="M268 376H232V412H268V376Z" stroke="#191919" />
        <path d="M304 376H268V412H304V376Z" stroke="#191919" />
        <path d="M340 376H304V412H340V376Z" stroke="#191919" />
        <path d="M376 376H340V412H376V376Z" stroke="#191919" />
        <path d="M412 376H376V412H412V376Z" stroke="#191919" />
        <path d="M448 376H412V412H448V376Z" stroke="#191919" />
        <path d="M484 376H448V412H484V376Z" stroke="#191919" />
        <path d="M232 412H196V448H232V412Z" stroke="#191919" />
        <path d="M268 412H232V448H268V412Z" stroke="#191919" />
        <path d="M304 412H268V448H304V412Z" stroke="#191919" />
        <path d="M340 412H304V448H340V412Z" stroke="#191919" />
        <path d="M376 412H340V448H376V412Z" stroke="#191919" />
        <path d="M412 412H376V448H412V412Z" stroke="#191919" />
        <path d="M448 412H412V448H448V412Z" stroke="#191919" />
        <path d="M484 412H448V448H484V412Z" stroke="#191919" />
        <path d="M232 448H196V484H232V448Z" stroke="#191919" />
        <path d="M268 448H232V484H268V448Z" stroke="#191919" />
        <path d="M304 448H268V484H304V448Z" stroke="#191919" />
        <path d="M340 448H304V484H340V448Z" stroke="#191919" />
        <path d="M376 448H340V484H376V448Z" stroke="#191919" />
        <path d="M412 448H376V484H412V448Z" stroke="#191919" />
        <path d="M448 448H412V484H448V448Z" stroke="#191919" />
        <path d="M484 448H448V484H484V448Z" stroke="#191919" />
        <path d="M232 484H196V520H232V484Z" stroke="#191919" />
        <path d="M268 484H232V520H268V484Z" stroke="#191919" />
        <path d="M304 484H268V520H304V484Z" stroke="#191919" />
        <path d="M340 484H304V520H340V484Z" stroke="#191919" />
        <path d="M376 484H340V520H376V484Z" stroke="#191919" />
        <path d="M412 484H376V520H412V484Z" stroke="#191919" />
        <path d="M448 484H412V520H448V484Z" stroke="#191919" />
        <path d="M484 484H448V520H484V484Z" stroke="#191919" />
        {rotatedArray?.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <path
              key={`${rowIndex}-${colIndex}`}
              fill-rule="evenodd"
              clip-rule="evenodd"
              d={dValues[rowIndex * 8 + colIndex]}
              style={{
                fill: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${
                  color[3] / 255
                })`,
              }}
            />
          ))
        )}
      </g>
      <defs>
        <clipPath id="clip0_1178_60295">
          <rect width="680" height="680" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
