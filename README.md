# Go To Outdoors Website

<div style="text-align: center;">
  <img src="https://raw.githubusercontent.com/pyc0422/national-parks/main/images/logo.svg" alt="logo" height=200>
</div>

### Tye it Live:     [Click Here](https://go-outdoors.vercel.app/)

Welcome to the Go To Outdoors website, your ultimate online resource for exploring national parks and mountain information. Our site is designed to help outdoor enthusiasts plan their visits to various national parks and learn more about famous mountains.

## Website Pages

- **Homepage**: Features the project logo and two buttons that direct users to either the National Park Search page or the Mountain Information page.

- **National Park Search Page**: Allows users to search for national parks in two ways:
  - By state
  - By the type of national park
  The page dynamically renders different options based on the user's selection. After performing a search, a detailed list of national parks is displayed. Users can reset their inputs and the displayed results at any time with a reset button.

- **Mountain Information Page**: Users can select from a dropdown menu of mountain names to view detailed information about each mountain, including photos, height, sunrise and sunset times today, and a brief description.

## Technologies Used

- **HTML**: Structures the web content and layout.
- **Bootstrap**: Provides styling and responsive design.
- **CSS**: Enhances the presentation of the website.
- **JavaScript**: Adds interactivity to the web pages, handling user inputs, dynamic content loading, and API calls.

## Features

- Responsive design that adapts to different devices and screen sizes.
- Dynamic content rendering based on user selections.
- Interactive elements for an engaging user experience.

## How to Use

1. **Navigate to the Homepage**: Start by visiting the homepage where you can choose to explore national parks or mountain details.
2. **Choose Your Search Option on the National Park Search Page**: Select either a state or a type of park, and then hit the search button to see results.
3. **Explore Mountain Details**: On the Mountain Information page, select a mountain from the dropdown to view its details.

## Project Structure

- `index.html`: The entry point of the website containing the homepage layout.
- `pages/search.html`: Contains the markup for the National Park Search functionality.
- `pages/mountains.html`: Contains the markup for the Mountain Information details.
- `styles/styles.css`: Contains all the common custom styling for the website.
- `styles/homepage.css`: Contains specific styling for homepage and search page
- `functions/`: contains 2 files which includes all JavaScript logic for dynamic behavior and API interactions.
- `data/`: Contains 4 js files with different data we need for this project
- `images/`: All the images and logos in that folder

## Setup

To run this project locally:
1. Clone the repository to your local machine.
2. Open `index.html` in your browser to view the website.

## Contributions

Contributions are welcome! If you have suggestions or improvements, please fork the repository and submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE.md).


We hope you find the Go To Outdoors website useful for planning your next adventure!
