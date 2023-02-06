import { Button, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Inter } from "@next/font/google";
import { getChunkedColors, randomColors } from "@/utils/colors";
import { dValues } from "@/utils/svg";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [colors, setColors] = useState(randomColors());
  const [svgString, setSVGString] = useState("");
  const svgLinkRef = useRef(null);
  const pngLinkRef = useRef(null);
  const canvasRef = useRef(null);
  const [svgUrl, setSvgUrl] = useState(null);
  const [pngUrl, setPngUrl] = useState(null);

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

  useEffect(() => {
    if (svgString) {
      setSvgUrl(
        URL.createObjectURL(
          new Blob([svgString], {
            type: "image/svg+xml;charset=utf-8",
          })
        )
      );

      console.log(
        URL.createObjectURL(
          new Blob([svgString], {
            type: "image/svg+xml;charset=utf-8",
          })
        )
      );

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        setPngUrl(canvas.toDataURL("image/png"));
      };
    }
  }, [svgString]);

  const handleSVGDownload = () => {
    svgLinkRef.current.href = svgUrl;
    svgLinkRef.current.download = "result.svg";
    svgLinkRef.current.click();
  };

  const handlePNGDownload = () => {
    pngLinkRef.current.href = pngUrl;
    pngLinkRef.current.download = "result.png";
    pngLinkRef.current.click();
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
      <Text>Convert a PNG/JPG image into a PNG/SVG in the Checks format.</Text>
      <Text>
        <Link
          color="#aaa"
          href="https://github.com/Slokh/checksify"
          _hover={{ color: "white" }}
        >
          Source Code
        </Link>{" "}
        | Inspiration:{" "}
        <Link
          color="#aaa"
          href="https://opensea.io/collection/vv-checks"
          _hover={{ color: "white" }}
        >
          Checks
        </Link>{" "}
        by{" "}
        <Link
          color="#aaa"
          href="https://twitter.com/jackbutcher"
          _hover={{ color: "white" }}
        >
          @jackbutcher
        </Link>
      </Text>
      <Input type="file" fontSize="2xl" onChange={handleChange} />
      <SVG rotatedArray={colors} setSVGString={setSVGString} />
      <Stack direction="row" align="center" justify="center" spacing={32}>
        <Link cursor="pointer" ref={svgLinkRef} onClick={handleSVGDownload}>
          Download SVG
        </Link>
        <Link cursor="pointer" ref={pngLinkRef} onClick={handlePNGDownload}>
          Download PNG
        </Link>
      </Stack>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Stack>
  );
}

const SVG = ({ rotatedArray, setSVGString }) => {
  useEffect(() => {
    const svgElement = document.querySelector("#result");
    setSVGString(new XMLSerializer().serializeToString(svgElement));
  }, [setSVGString, rotatedArray]);

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
