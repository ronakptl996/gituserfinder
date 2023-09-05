$(function () {
  let timer;

  $("#profile").avnSkeleton({
    // default configs
    cssPrefix: "avn-skeleton",
    div: {
      selector: "> div",
      paragraphs: 2,
      lines: 5,
      // icon: true,
      // loader: true,
    },
  });

  function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    $("#languageBgColor").css("background-color", color);
    console.log(color);
  }

  $(".searchUser").on("keyup", function (e) {
    const getUser = () => {
      $.ajax({
        url: `https://api.github.com/users/${e.target.value}`,
        data: {
          client_id: process.env.GIT_CLIENT_ID,
          client_secret: process.env.GIT_CLIENT_SECRET,
        },
        error: function (err) {
          alert(`${err.status} ${err.responseJSON.message}`);
          console.log(err);
        },
        beforeSend: function (xhr) {
          $("#profile").avnSkeleton("display");
          console.log(xhr);
        },
      }).done(function (user) {
        $("#profile").avnSkeleton("remove");
        console.log(user);
        $.ajax({
          url: `https://api.github.com/users/${e.target.value}/repos`,
          data: {
            client_id: "2987b1bab87b8a18c3e5",
            client_secret: "ddfc422aaf273512c4f08756f9e941bf07b70242",
            sort: "created: asc",
            per_page: 5,
          },
        }).done(function (repos) {
          $.each(repos, function (index, repo) {
            getRandomColor();
            $("#repository").append(`
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <a class="mb-0 text-decoration-none fs-5 text-primary fw-medium" target="_blank" href=${
                                  repo.html_url
                                }>${repo.name}</a>
                                <p class="text-muted mb-0">${
                                  repo.description
                                    ? repo.description.length > 100
                                      ? repo.description.slice(0, 100) + "..."
                                      : repo.description
                                    : "-"
                                }</p>
                            </div>
                            <div>
                            ${
                              repo.language
                                ? `<span class="px-1">
                                  <span class="d-inline-block rounded-circle" id="languageBgColor" style="width: 10px; height: 10px;"></span>
                                           <small class="text-muted mb-0" style="font-size: 13px;">
                                            ${repo.language}
                                          </small>
                                      </span>`
                                : ""
                            }
                            ${
                              repo.license
                                ? `<span class="px-1">
                                     <small class="text-muted mb-0" style="font-size: 13px;">
                                    <img src="/images/law.png" alt="avatar" class="" style="width: 15px;">
                                      ${repo.license.name}
                                    </small>
                                </span>`
                                : ""
                            }
                            ${
                              repo.updated_at
                                ? `<span class="px-1">
                                       <small class="text-muted mb-0" style="font-size: 13px;">
                                        Updated on ${new Date(
                                          repo.updated_at
                                        ).toLocaleString()}
                                      </small>
                                  </span>`
                                : ""
                            }
                            </div>
                        </div>
                    </div>
                </div>
            `);
          });
        });
        $("#profile").html(`
        <section style="background-color: #eee;">
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-4">
              <div class="card mb-4">
                <div class="card-body text-center">
                  <img src=${user.avatar_url} alt="avatar"
                    class="rounded-circle img-fluid" style="width: 150px;">
                  <h5 class="my-3">${user.name ? user.name : "Not Defined"}</h5>
                  <p class="text-muted mb-1">${
                    user.bio ? user.bio : "Not Defined"
                  }</p>
                  <div class="d-flex justify-content-center mb-2">
                    <p class="text-muted mb-1 px-2">Followers: ${
                      user.followers
                    }</p>
                    <p class="text-muted mb-1 px-2"> Following: ${
                      user.following
                    }</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
            <div class="mb-3">
                <span class="badge bg-secondary">Public Repos: ${
                  user.public_repos
                }</span>
                <span class="badge bg-primary">Public Gists: ${
                  user.public_gists
                }</span>
            </div>
              <div class="card mb-4">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Name</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">${
                        user.name ? user.name : "Not Defined"
                      }</p>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Email</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">${
                        user.email ? user.email : "-"
                      }</p>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Profile</p>
                    </div>
                    <div class="col-sm-9">
                      <a class="text-muted mb-0" target="_blank" href=${
                        user.html_url
                      }>${user.html_url}</a>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Website/blog</p>
                    </div>
                    <div class="col-sm-9">
                      <a class="text-muted mb-0" ${
                        user.blog ? `href=${user.blog}` : ""
                      }>${user.blog ? user.blog : "-"}</a>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Address</p>
                    </div>
                    <div class="col-sm-9">
                      <p class="text-muted mb-0">${
                        user.location ? user.location : "-"
                      }</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="card mb-4 mb-md-0">
                    <div class="card-body">
                      <h4>Latest Repos</h4>
                      <div id="repository"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        `);
      });
    };

    clearTimeout(timer);
    timer = setTimeout(getUser, 500);
  });
});
