import imageCompression from "browser-image-compression";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

// Initialize FFmpeg instance
const ffmpeg = new FFmpeg();
let isFFmpegLoaded = false;


// Image compression function
export const compressImage = async (file) => {
    try {
        // Image compression options
        const options = {
            maxSizeMB: 0.5, // Max size 0.5MB
            maxWidthOrHeight: 800, // Resize to 800px (maintain aspect ratio)
            useWebWorker: true,
        };

        // Compress the image
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (err) {
        console.error("Error: Compressing Image", err);
        alert("Error compressing image.");
    }
};

// Video compression function using FFmpeg
export const compressVideo = async (file) => {
    try {
        // Load FFmpeg only once
        if (!isFFmpegLoaded) {
            console.log("Loading FFmpeg...");
            await ffmpeg.load();
            isFFmpegLoaded = true; // Set flag after loading
        }

        console.log("Compressing video...");

        // Write the input video file to FFmpeg's virtual filesystem
        const inputFileName = "input.mp4";
        const outputFileName = "output.mp4";

        await ffmpeg.writeFile(inputFileName, await fetchFile(file));

        // FFmpeg compression command
        await ffmpeg.exec([
            "-i", inputFileName,     // Input file
            "-vcodec", "libx264",    // Use H.264 codec
            "-crf", "28",            // Set compression quality (28 = low quality, smaller size)
            "-preset", "fast",       // Speed/quality tradeoff
            outputFileName           // Output file name
        ]);

        // Read the compressed video file from FFmpeg's filesystem
        const compressedData = await ffmpeg.readFile(outputFileName);

        // Convert the result to a File object
        const compressedBlob = new Blob([compressedData.buffer], { type: "video/mp4" });
        const compressedFile = new File([compressedBlob], "compressed_video.mp4", { type: "video/mp4" });

        console.log("Compression complete:", compressedFile);
        return compressedFile; // Return the File object
    } catch (err) {
        console.error("Error: Compressing Video", err);
        throw new Error("Error compressing video.");
    }
};