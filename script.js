const usernameInput = document.querySelector("#username");
const searchBtn = document.querySelector("#searchBtn");

const profile = document.querySelector("#profile");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");


searchBtn.addEventListener("click", async function () {

    const userName = usernameInput.value.trim();

    if (userName === "") {
        showError("Please enter GitHub username");
        return;
    }

    profile.classList.add("hidden");
    error.classList.add("hidden");
    loading.classList.remove("hidden");

    try {

        const response = await fetch(
            `https://api.github.com/users/${userName}`
        );

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();

        console.log(data);

        document.querySelector("#avatar").src = data.avatar_url;

        document.querySelector("#name").textContent =
            data.name || "No name";

        document.querySelector("#login").textContent =
            "@" + data.login;

        document.querySelector("#bio").textContent =
            data.bio || "No bio available";

        document.querySelector("#repos").textContent =
            data.public_repos;

        document.querySelector("#followers").textContent =
            data.followers;

        document.querySelector("#following").textContent =
            data.following;

        document.querySelector("#location").textContent =
            data.location || "Not available";

        document.querySelector("#company").textContent =
            data.company || "Not available";

        document.querySelector("#gists").textContent =
            data.public_gists;

        document.querySelector("#created").textContent =
            new Date(data.created_at).toLocaleDateString();

        document.querySelector("#githubLink").href =
            data.html_url;

        profile.classList.remove("hidden");

    } catch (err) {

        showError(err.message);

    } finally {

        loading.classList.add("hidden");

    }
});


function showError(message) {

    error.textContent = message;

    error.classList.remove("hidden");
}