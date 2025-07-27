---
layout: home
title: Home
---

<div id="intro-wrapper" class="l-text">
	<div id="intro-title-wrapper">
		<div id="intro-image-wrapper">
			<img id="intro-image" src="/images/portrait.jpg"></div>
		<div id="intro-title-text-wrapper">
			<h1 id="intro-title">Hi, I'm Suraj Bhardwaj</h1>
			<div id="intro-subtitle">I'm a Data Scientist & AI Researcher.</div>
			<div id="intro-title-socials">
				{% for link in site.data.social-links %}
					{% if link.on-homepage == true %}
						{% include social-link.html link=link %}
					{% endif %}
				{% endfor %}
			</div>
		</div>
	</div>
	<!-- <hr class="l-middle home-hr"> -->
	<div id="everything-else" class="l-middle">
		<a href="{{ site.url }}/cv"><div><i class="fa fa-portrait icon icon-right-space"></i>CV</div></a>
		<a href="{{ site.url }}/projects"><div><i class="fa fa-shapes icon icon-right-space"></i>Projects</div></a>
		<a href="{{ site.url }}/everything-else"><div><i class="fa fa-list-ul icon icon-right-space"></i>Everything Else</div></a>
	</div>
	<div>
		I design and develop machine learning models and applications that empower people to <b>understand the real-world impact of AI</b> and data-driven systems. Alongside building intelligent web tools and applications, I also craft <b>insightful data visualizations</b> and write interactive, engaging articles to make complex ideas more accessible and understandable.
	</div>
	<div style="height: 1rem"></div>
	<div>
		I received my M.Sc. in Mechatronics from Universität Siegen, where I completed my master’s thesis under the guidance of <a href="https://sites.google.com/site/michaelmoellermath/">Prof. Michael Möller</a> and <a href="https://jovitalukasik.github.io/">Dr. Jovita Lukasik</a>. My dissertation, titled <a href="/dissertation">Improved Driver Distraction Detection Using Self-Supervised Learning</a>, was supported by the research institute <i>Fraunhofer IOSB</i>, where I worked part-time as a Research Assistant. In this role, I contributed to the Human-AI Interaction department under the supervision of <a href="https://www.iosb.fraunhofer.de/en/press/press-releases/2024/human-ai-interaction-new-department-focus.html">Dr.-Ing. Michael Voit</a>, <a href="https://www.iosb.fraunhofer.de/de/projekte-produkte/integrated-autonomous-driving-lab.html">Dr.-Ing. Frederik Diederichs</a>, and <a href="https://scholar.google.com/citations?view_op=list_works&hl=de&hl=de&user=BDOfyn8AAAAJ">M.Sc. David Lerch</a>.
	</div>
	<div style="height: 1rem"></div>
	<div>
		During my time at <a href="https://www.iosb.fraunhofer.de/">Fraunhofer IOSB</a>, I collaborated closely with developers, and researchers on cutting-edge AI initiatives under the <a href="https://karli-projekt.de/">KARLI</a> and <a href="https://projekt-salsa.de/en/">SALSA</a> projects. I have worked on developing intelligent AI systems that combine large language models with retrieval-based architectures to enable scalable, context-aware information access. My experience also includes leading high-impact technical demonstrations, where I translated complex machine learning solutions into real-world applications for diverse stakeholders including researchers, industry leaders, and public sector officials.
	</div>
</div>

<hr class="l-middle home-hr">

<h2 class="feature-title"><a href="/cv/#publications">Publications</a></h2>

<p class="feature-text">
	Mainly publish on video and image recognition, video and image generation, object detection/segmentation, multimodal learning, and self-supervised learning.
</p>

<div class="cover-wrapper cover-wrapper-3-col l-page">
	{% assign sortedPublications = site.categories.papers | sort: 'feature-order' %}
	{% for feature in sortedPublications %}
		{% if feature.featured == true %}
			{% include feature.html feature=feature %}
		{% endif %}
	{% endfor %}
</div>

<br>
<h2 class="feature-title"><a href="/dissertation">Dissertation</a></h2>

<p class="feature-text">
	My dissertation focuses on detecting driver distractions using Vision Transformers trained using supervised and self-supervised learning techniques. This work also proposes a novel unsupervised learning based sampling technique (Clustered Feature Weighting: CFW) for loading the imbalanced datasets batchwise during model training. CFW improves the imbalance in the dataset batchwise and is a label free approach to solve the problem of learning from imbalanced datasets.
</p>

<div class="cover-wrapper cover-wrapper-1-col l-text">
	{% include dissertation/document.html details=false location=home %}
</div>

<div class="cover-wrapper cover-wrapper-3-col l-page">
	{% assign sortedPublications = site.categories.papers | sort: 'feature-order' %}
	{% for feature in sortedPublications %}
		{% if feature.dissertation == true %}
			{% include feature.html feature=feature %}
		{% endif %}
	{% endfor %}
</div>


[us]: https://www.uni-siegen.de/ "Uni Siegen"
[usm]: https://www.uni-siegen.de/studium/master/mechatronics "Uni Siegen Mechatronics"
[coc]: https://www.uni-siegen.de/ingenieurwesen-informatik-technik "Uni Siegen Engineering Computer Science and Technology"