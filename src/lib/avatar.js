// seed creates exact same avatar each time, so it cannot be male/female
// create arrays/objects containing hair variants applicable for males and females
// select correct values based on selected gender
// use firstname as seed


// male = hat, variant60, variant53, variant49, variant44
// female = variant01, variant02, variant03, variant04, variant10

const avatarGenerator = async (gender, firstName) => {
    let baseUrl = 'https://api.dicebear.com/9.x/';
    let avatarStyle = "notionists";
    let hairVariant = "";

    const options = {
        beardProbability: "0",
        bodyIconProbability: "20",
        gestureProbability: "0",
    };

    // select gender-specific hair variants
    if (gender === 'male') {
        hairVariant = "hat,variant60,variant53,variant49,variant44";
    } else if (gender === 'female') {
        hairVariant = "variant01,variant02,variant03,variant04,variant10";
    }

    // Build the query string based on options
    const queryString = Object.entries(options)
        .map(([key], value) => `${key}=${value}`)
        .join('&');

    // Build url string
    const url = `${baseUrl}${avatarStyle}/svg?seed=${firstName}&hair=${hairVariant}&${queryString}`;
    //debug
    console.log(url);
    // fetch avatar from api
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch avatar');
    }

    return response.url;
};

export default avatarGenerator;