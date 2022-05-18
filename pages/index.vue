<template>
	<main>
		<!-- Navbar -->
		<NavbarSP />

		<!-- Main section -->
		<section id="content">
			<MainContent />
		</section>
	</main>
</template>

<script>
import MainContent from "~/components/MainContent.vue"
import NavbarSP from "~/components/NavbarSP.vue"
export default {
	name: "IndexPage",
	loading: {
		color: "#B17AF8",
		height: "20px"
	},
	components: { MainContent, NavbarSP }
}
</script>
