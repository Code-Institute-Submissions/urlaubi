# Urlaubi - Milestone Two

This is the second Milestone project for my course at Code Institute. I decided to create a site that allows users to search for their next holiday destination. My goal was to help users to:
- Select a destination city
- Find tourist attractions
- Find accommodation
- Find bars and restaurants

 
## UX
 
While I did not directly focus on a mobile first approach, the app is meant for users looking for a quick overview over the accomodations, restaurants etc that a city has to offer. I focussed on a straight-forward approach with little to no room for error by predominantly offering selections rather than type-ahead imput. 

The initial wireframes in Balsamiq can be found  [here] (https://balsamiq.cloud/s74acfz/pgz3a04)

## Features
 
### Existing Features
- biased city search - this feature eliminates double-results and the danger for error or missing results due to spelling mistakes by limiting the city selection based on the country which previously was selected
- activty selection - this feature allows the user to query results based on the activity they select. Once again this eliminates room for error
- Google Maps - this feature shows the user where the country / city is located, and provides markers for the activity chosen 
- Results Table - thos feature makes sure the user gains a good overview over the different markers 
- contact form - this feature allows the user to provide feedback 

### Features Left to Implement
- Skyscanner (or similar API) integration - I would like to enable users to check directly for flights and travel options (however the skyscanner API is for commercial use upon request only)
- Traveladvisor feature - I would like to enable a travel advisor link depending on the location/marker chosen 
- "Our favourtite Destination"-section - I am looking to implement a function that links, upon clicking on a picture, to the results of the app specified to the destination in the link. As an example, the Brandenburger Tor would link to the search results of "Germany > Berlin > Sightseeing"

## Technologies Used
    
-  [HTML and CSS] (XX)
      - The project uses **HTML and CSS** 
      
-  [JavaScript] (https://www.javascript.com/)
      - The project uses **JavaScript** for DOM manipulation
      
 - [Bootstrap4] (https://getbootstrap.com/)
      - The project uses **Bootstrap 4** for simplified styles and grid system and responsive design
 
 - [Google Places API] (https://developers.google.com/places/web-service/intro)
      - The project leans heavily on the **Google Places API**  

-  [Email JS] (https://www.emailjs.com/)
      - The project uses **EmailJs** for the contact form
   


## Testing

1. Country selection:
     1. Go to the "Select a country" 
     2. Verify that only countries offered in the selection, or "All", can be selected 
     
2. City selection:
     1. Go to the "Select a city" 
     2. Verify that the city selection is biased to the country selected 

3. Activity selection:
     1. Go to the activity selection 
     2. Verify that only activities offered in the selection, can be selected 
     
4. Markers:
     1. Click on the markers
     2. Verify that markers include a link to the hotel/attraction

5. Contact form:
    1. Go to the "Feedback" page
    2. Try to submit the form and verify that confirmation message appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Verify that email arrives at destination with the required variables showing correctly

I tested loading times in different browsers and on different devices, making sure the look and feel of the app stays the same.

## Deployment

This project will be deployed via Github Pages.


## Credits
During my project I relied heavily on the documentation provided through the [Google API documentation] (/developers.google.com/places), which I partially took as a basis to determine what is possible to do. I changed code depending on my needs and added or deleted code accordingly
I used wikipedia.com for information on latitude and longitude of countries and I used a registry hosted by [www.Iana.org] (https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) for language subtags.
The code for the contact form is **based on** what was provided via EmailJs, however, this too has been changed and variables/ onClick events have been added

### Content
- there is no content

### Media
- The photo used in this site were obtained from the pixabay platform at https://pixabay.com/en/tropical-summer-sunset-beach-1651426/

