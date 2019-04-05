$(document).ready(function () {
	var animes = ["steins gate", "ano hana", "serial experiments lain", "akira", "trigun", "toradora"];

	
	function renderButtons() {
		$("#anime-buttons").empty();
		for (i = 0; i < animes.length; i++) {
			$("#anime-buttons").append("<button class='btn btn-success' data-anime='" + animes[i] + "'>" + animes[i] + "</button>");
		}
	}

	renderButtons();

	
	$("#add-anime").on("click", function () {
		event.preventDefault();
		var anime = $("#anime-input").val().trim();
		animes.push(anime);
		renderButtons();
		return;
	});


	
	$("button").on("click", function () {
		var anime = $(this).attr("data-anime");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			anime + "&api_key=dc6zaTOxFJmzC&limit=10"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#animes").empty();
			for (var i = 0; i < results.length; i++) {
				var animeDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var animeImg = $("<img>");

				animeImg.attr("src", results[i].images.original_still.url);
				animeImg.attr("data-still", results[i].images.original_still.url);
				animeImg.attr("data-animate", results[i].images.original.url);
				animeImg.attr("data-state", "still");
				animeImg.attr("class", "gif");
				animeDiv.append(p);
				animeDiv.append(animeImg);
				$("#animes").append(animeDiv);
			}
		});
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}

	
	$(document).on("click", ".gif", changeState);

});