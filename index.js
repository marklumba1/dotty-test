const activeNav = (id) => {
    $(`nav ul li.active`).removeClass(`active`);
    $(`#${id}`).addClass(`active`);

    $(`main .sidenav div.active`).removeClass(`active`);
    $(`#${id}-dot`).addClass(`active`);

}

const checkWindowWidth = () => {
    let original = ["Background & Challenge", "Solution", "Slideshow"]
    let icons = ["hiking", "emoji_objects", "slideshow"]
    if ( window.innerWidth <= 1000){
         $("nav ul li:not(.divider, :first-child)").addClass("material-icons")
         $("nav ul li:not(.divider, :first-child)").each((index,element) => {
            $(element).html(icons[index])
         });
         $(".menus button .label").html("")


    }else{
        $("nav ul li:not(.divider, :first-child)").removeClass("material-icons")
        $(".menus button .label").html("Download Board")
        $("nav ul li:not(.divider, :first-child)").each((index,element) => {
            $(element).html(original[index])
         });
    }
}

const checkWindowScroll = () => {
    let scroll = $(window).scrollTop()
    if (scroll < window.innerHeight - (window.innerHeight/2)) {
        $(`.play-button-container`).addClass("fade-in")
        activeNav("header")
    }
    else if (scroll < (window.innerHeight * 2) - (window.innerHeight/2)) {
        $(`.logo`).addClass("fade-in")
        $(`#background-and-challenge-section .inner-group .fade-right`).each((index, element) => {
            setTimeout(() => {$(element).addClass("fade-in-translate")}, 600 * index)
        })
        activeNav("background-and-challenge")
    }
    else if (scroll < (window.innerHeight * 3) - (window.innerHeight/2)) {
        $(`#solution-section .inner-group .text p, .inner-group .text h2`).each((index,element) => {
            setTimeout(() => {$(element).addClass("fade-in")}, 300 * index)
        })
        setTimeout(() => $(`.text-title`).addClass("fade-in"), 2400)
        activeNav("solution")
    }
    else if (scroll >= (window.innerHeight * 3) - (window.innerHeight/2)){
        $(`.nav-bottom ul li`).each((index, element) => {
            setTimeout(() => $(element).addClass(`fade-in`), 300 * index)
        })
        setTimeout(() => $(`#slideshow-section .inner-group .img-container`).addClass("fade-in-translate"), 500)
        setTimeout(() => $(`.slide-text`).addClass("fade-in-translate"), 500)
        activeNav("slideshow")
    }
}

$(document).ready(() =>{
    //upon load check width and scroll position
    checkWindowWidth()
    checkWindowScroll()
    // on resize
    addEventListener("resize", (event) => {
        checkWindowWidth()
      })

    //nav clicks
    $("nav .menus ul li:not(#results-and-effective), nav .menus ul li button, main .sidenav div").click(menu => {
        let id = menu.target.id

        // if its from sidenav remove "-dot"
        if (id.includes("-dot")) id = id.split("-dot")[0]
     
        $("html").animate({
            scrollTop: $(`#${id}-section`).position().top + 25, 
        }, 200, 'linear')
 
       
        activeNav(id)
       
    })

    //scroll listener
    let timeout
    $(window).scroll(() => {
        //added delay for active bar
        clearTimeout(timeout)
        timeout = setTimeout(() => {
           checkWindowScroll()
        },100)
      
    });

    //bottom nav
    $(".nav-bottom ul li").click((element) => {
     
        const description = {
            video: `A 60 second promotional movie trailer played on TV, online as pre rolls and via Facebook, to promote the movie that was waiting to be written to our movie-loving target audience, and encourage them to enter.`,
            photo: `Shots posted on Facebook and Instagram every day inspired thousands of entries. We reacted to the storyline as it developed in real time, selecting and treating the next image according to the day’s winning scene.`,
            social: `The complete movie storyboard showcased the entire story, completely inspired by stunning images captured in the Whitsundays, with all 20 winning scenes accompanying the images.`,
            pr: `We enlisted the help of Craig Pearce as script supervisor, who was tasked with choosing the winner each day to ensure the story flowed properly, and providing daily writing tips to encourage people to take part.`,
            radio: `Live reads from NOVA presenters reflected the ever-evolving story of Jake in real time, and encouraged people to get involved to shape the story themselves.`
            
        }

        $(`.nav-bottom ul li.active`).removeClass(`active`);
        $(`.nav-bottom ul #${element.target.id}`).addClass(`active`);
        $(`#img-bottom`).attr(`src`,`./images/${element.target.id}.png`);

        $(`#slideshow-section .inner-group .img-container`).removeClass("fade-in-translate")
        $(`.slide-text`).removeClass("fade-in-translate")
        $(`.slide-text .text #text-bottom`).html(description[`${element.target.id}`])
        
        setTimeout(() => $(`#slideshow-section .inner-group .img-container`).addClass("fade-in-translate"), 50)
        setTimeout(() => $(`.slide-text`).addClass("fade-in-translate"), 50)
    })

    //starting animation
    $(`.sidenav div`).each((index, element) => {
        setTimeout(() => {$(element).addClass("enter-right")}, 200 * index)
    })
    $("nav ul li:not(.divider)").each((index,element) => {
        setTimeout(() => {$(element).addClass("enter-top")}, 200 * index)
    })
    $(`.menus button`).delay(1500).addClass("enter-top")


    //add class for multiple p tags for animation
    $(`
    #solution-section .inner-group .text p, 
    .inner-group .text h2, 
    .nav-bottom ul li`).addClass("opacity-none")

    //video click
    $(`.play-button`).click( () => {
        $(`#video`).css(`display`, `block`)
        $(`.play-button`).css(`display`,`none`)  
        $(`.close-button`).css(`opacity`,`1`)      
    })

    $(`.close-button`).click( () => {
        $(`#video`).css(`display`, `none`)
        $(`.play-button`).css(`display`,`block`)   
        $(`.close-button`).css(`opacity`,`0`)   
        
    })

})