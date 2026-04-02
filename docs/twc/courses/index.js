document.addEventListener('DOMContentLoaded', async function() {
await loadIn('loadedBody','page.html');
const courses = await (await fetch('/p8a6nna86/layouts/courses.json')).json();


const courseItems = courses.map(course => ({
    image: course.image,
    tag: '<i class="abs bg-light text-primary text-center pad3 round3 block">' + course.category + '</i><br>',               // skill-development | academic-learning
    title: `<p class="text-primary">${course.name}</p>`,                 // Course name
    subtitle: course.subtitle,          // Short tagline
    description: course.description + `<br/><br/><a class="btn bg-primary text-secondary round3 pad3" href="/twc/courses/${course.category}/${course.link}" > Learn More ...</a><br/>`,    // Summary text
    onclick: () => {
      window.location.href = `/twc/courses/${course.category}/${course.link}`;
    }
  }));


renderCards(courseItems,'courseContainer');
//loadCourseTopics('bcodertwc.json','courseContainer','slideFrame','docFrame','topicName');
})