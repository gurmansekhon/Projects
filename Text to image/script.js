const key = "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";
const inputText = document.getElementById("input");
const image = document.getElementById("image");
const generateButton = document.getElementById("btn");
const resetButton = document.getElementById("reset");
const downloadButton = document.querySelector(".outBtn button");

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: `Bearer ${key}`
			},
			method: "POST",
			body: JSON.stringify({"inputs": inputText.value}),
		}
	);
	const result = await response.blob();
	return result;
}
async function generate() {

    spinner.style.display = "block"; // Show the spinner
    image.src = ""; // Clear the current image

	try {
		const response = await query();
		const objectUrl = URL.createObjectURL(response);
		image.src = objectUrl;
        image.onload = () => {
            spinner.style.display = "none";
        };
	} catch (error) {
		console.error("Error generating image:", error);
        spinner.style.display = "none";
	}

}

function downloadImage() {
	if (image.src) {
		const link = document.createElement("a");
		link.href = image.src;
		link.download = "generated-image.png";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} else {
		alert("No image to download. Please generate an image first.");
	}
}

generateButton.addEventListener("click" , () => {
    generate();
})

function resetImage() {
	image.src = "icon.png";
	inputText.value = "";
}


inputText.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        generate();     
    }

})

downloadButton.addEventListener("click", downloadImage);
resetButton.addEventListener("click", resetImage);