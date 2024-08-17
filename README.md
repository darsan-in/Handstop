<div align="center">

# Handstop - High-Performance Video Encoding Library for Node.js

<p id="intro">Handstop is a robust video encoding library for Node.js, built on the core of the HandBrake video encoding binary. It offers efficient video compression with three output formats optimized for web use: WebM-AV1, MP4-AV1, and MP4-x265. Each format comes with three customizable presets to balance compression levels, file size, and encoding speed, achieving a maximum compression ratio of 93.16%.</p>

### Supported Platforms

[![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)]()
[![Node JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)]()

---

<p>

<span>
  <a href="https://github.com/darsan-in/Handstop/commits/main">
    <img src="https://img.shields.io/github/last-commit/darsan-in/Handstop?display_timestamp=committer&style=for-the-badge&label=Updated%20On" alt="GitHub last commit"/>
  </a>
</span>

<span>
  <a href="">
    <img src="https://img.shields.io/github/commit-activity/m/darsan-in/Handstop?style=for-the-badge&label=Commit%20Activity" alt="GitHub commit activity"/>
  </a>
</span>

</p>

---

<p>

<span>
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/darsan-in/Handstop?style=for-the-badge&label=License" alt="GitHub License"/>
  </a>
</span>

<span>
  <a href="https://github.com/darsan-in/Handstop/releases">
    <img src="https://img.shields.io/github/v/release/darsan-in/Handstop?include_prereleases&sort=date&display_name=tag&style=for-the-badge&label=Latest%20Version" alt="GitHub Release"/>
  </a>
</span>

</p>

<p>

<span>
  <a href="https://www.codefactor.io/repository/github/darsan-in/Handstop/issues/main">
    <img src="https://img.shields.io/codefactor/grade/github/darsan-in/Handstop?style=for-the-badge&label=Code%20Quality%20Grade" alt="CodeFactor Grade"/>
  </a>
</span>

</p>

---

<p>

<span>
  <a href="">
    <img src="https://img.shields.io/npm/d18m/handstop?style=for-the-badge&label=Downloads%20On%20NPM" alt="NPM Downloads"/>
  </a>
</span>

<span>
  <a href="">
    <img src="https://img.shields.io/github/stars/darsan-in/Handstop?style=for-the-badge&label=Stars" alt="GitHub Repo stars"/>
  </a>
</span>

</p>

---

<p>

<span>
  <a href="https://github.com/sponsors/darsan-in">
    <img src="https://img.shields.io/github/sponsors/darsan-in?style=for-the-badge&label=Generous%20Sponsors" alt="GitHub Sponsors"/>
  </a>
</span>

</p>

---

</div>

## Table of Contents 📝

- [Features and Benefits](#features-and-benefits-)
- [Use Cases](#use-cases-)
- [Friendly request to users](#-friendly-request-to-users)

- [Installation - Step-by-Step Guide](#installation---step-by-step-guide-)
- [Usage](#usage)
- [In-Action](#in-action-)

- [License](#license-%EF%B8%8F)
- [Contributing to Our Project](#contributing-to-our-project-)
- [Website](#website-)

- [Contact Information](#contact-information)
- [Credits](#credits-)

## Features and Benefits ✨

* **HandBrake Core Integration**: Utilizes the powerful HandBrake video encoding binary, integrated seamlessly into Node.js.
* **Multiple Web-Optimized Formats**: Supports WebM-AV1, MP4-AV1, and MP4-x265, catering to different web standards and playback needs.
* **Customizable Compression Presets**: Three presets available for each format:
  * **Level 1**: Fastest encoding with larger file sizes.
  * **Level 2**: Balanced compression and performance.
  * **Level 3**: Highest compression with the smallest file sizes, achieving up to 93.16% compression.
* **GPU Acceleration with MP4-x265**: Leverages Nvidia GPU for faster encoding with MP4-x265, while WebM-AV1 and MP4-AV1 are CPU-based, leading to slower encoding but offering higher compression ratios.
* **Optimized for Compression**: AV1 format provides the highest compression ratio, making it ideal for minimizing file sizes without compromising quality.
* **Easy Integration**: Designed for easy use within Node.js projects, enabling seamless video encoding workflows.


## Use Cases ✅

* Efficient video encoding for web-based applications with format-specific requirements.
* Leveraging GPU acceleration for faster encoding in MP4-x265 formats.
* Customizing video output based on desired file size and quality using compression presets.
* Optimizing video content for streaming platforms and web delivery.
* Experimenting with advanced video encoding techniques directly within Node.js.
* Reducing video file sizes significantly while maintaining quality, particularly with AV1 formats.


---

### 🙏🏻 Friendly Request to Users

Every star on this repository is a sign of encouragement, a vote of confidence, and a reminder that our work is making a difference. If this project has brought value to you, even in the smallest way, **please consider showing your support by giving it a star.** ⭐

_"Star" button located at the top-right of the page, near the repository name._

Your star isn’t just a digital icon—it’s a beacon that tells us we're on the right path, that our efforts are appreciated, and that this work matters. It fuels our passion and drives us to keep improving, building, and sharing.

If you believe in what we’re doing, **please share this project with others who might find it helpful.** Together, we can create something truly meaningful.

Thank you for being part of this journey. Your support means the world to us. 🌍💖

---

## Installation - Step-by-Step Guide 🪜

- **Step 1:** Install `handstop` package.
```bash
npm install handstop
```
- **Step 2:** Check out demo repo for snippets.
https://github.com/darsan-in/handstop-demo


## Usage

- Single and multi video encoding code snippets are available in [handstop-demo](https://github.com/darsan-in/handstop-demo) repository.


## In-Action 🤺
Below result is borrowed from [Minomax demo repository](https://github.com/cresteem/Minomax-Demo), `Minomax` utilizes `handstop` under the hood.
If you want compress your web media resources like **html, css, js, video, pictures** everything you can compress to efficient and smaller size as possible using [Minomax](https://github.com/cresteem/Minomax).

[result of handstop](https://github.com/cresteem/Minomax-Demo/blob/main/reports/video_compression.png)

## License ©️

This project is licensed under the [Apache License 2.0](LICENSE).

## Contributing to Our Project 🤝

We’re always open to contributions and fixing issues—your help makes this project better for everyone.

If you encounter any errors or issues, please don’t hesitate to [raise an issue](../../issues/new). This ensures we can address problems quickly and improve the project.

For those who want to contribute, we kindly ask you to review our [Contribution Guidelines](CONTRIBUTING) before getting started. This helps ensure that all contributions align with the project's direction and comply with our existing [license](LICENSE).

We deeply appreciate everyone who contributes or raises issues—your efforts are crucial to building a stronger community. Together, we can create something truly impactful.

Thank you for being part of this journey!

## Website 🌐

<a id="url" href="https://www.npmjs.com/package/handstop">https://www.npmjs.com/package/handstop</a>

## Contact Information

For any questions, please reach out via hello@darsan.in or [LinkedIn](https://www.linkedin.com/in/darsan-in/).

## Credits 🙏🏻
### To HandBrake
Handstop is built on the core of the HandBrake video encoding binary. We extend our deepest gratitude to the [HandBrake organization](https://github.com/HandBrake) and all contributors who have worked on the HandBrake project. Their hard work and dedication have made HandBrake one of the most powerful and versatile video encoding tools available. 

Special thanks to:
- **Eric Petit (original author)**: For initiating the HandBrake project.
- **HandBrake Team**: For continuously maintaining and improving the software over the years.
- **All Contributors**: For their valuable contributions to the HandBrake project, making it what it is today.


---

<p align="center">

<span>
<a href="https://www.linkedin.com/in/darsan-in/"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/linkedin.png" alt="Darsan at Linkedin"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://www.youtube.com/@darsan-in"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/youtube.png" alt="Darsan at Youtube"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://www.facebook.com/darsan.in/"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/facebook.png" alt="Darsan at Facebook"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://www.npmjs.com/~darsan.in"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/npm.png" alt="Darsan at NPM"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://github.com/darsan-in"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/github.png" alt="Darsan at Github"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://huggingface.co/darsan"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/hf.png" alt="Darsan at Huggingface"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://www.reddit.com/user/iamspdarsan/"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/reddit.png" alt="Darsan at Reddit"></a>
</span>

<span>
  <img width='20px' height='20px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/gap.png" alt="place holder image">
</span>

<span>
<a href="https://darsan.in/"><img width='45px' height='45px' src="https://raw.githubusercontent.com/darsan-in/.github/main/brand/footer-icons/website.png" alt="Darsan Website"></a>
</span>

<p>

---

#### Topics

<ul id="keywords">
<li>video-encoding</li>
<li>Node.js</li>
<li>Handstop-library</li>
<li>HandBrake-integration</li>
<li>video-compression</li>
<li>web-video-formats</li>
<li>GPU-acceleration</li>
<li>MP4-x265</li>
<li>WebM-AV1</li>
<li>MP4-AV1</li>
<li>high-performance</li>
<li>open-source</li>
<li>API-integration</li>
<li>video-presets</li>
<li>compression-levels</li>
</ul>
