<template>
    <OnboardingPage>
        <template #title>
            Парки
        </template>
        <template #content>
            <p>Здесь я придумаю какой-то текст, который в двух словах расскажет об этом направлении</p>
        </template>
    </OnboardingPage>
</template>

<script>
import OnboardingPage from "@/components/onboarding/OnboardingPage";

export default {
    name: "OnboardingParksScreen",
    components: { OnboardingPage },
}
</script>
