import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

// Styled Components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledButton = styled(TouchableOpacity);

export default function App() {
    return (
        <StyledView className="flex-1 bg-[#221f10]">
            <StatusBar style="light" />
            <SafeAreaView className="flex-1">
                {/* Header */}
                <StyledView className="px-4 py-4 flex-row items-center justify-between border-b border-white/5">
                    <StyledView className="flex-row items-center gap-2">
                        <StyledView className="w-8 h-8 rounded-lg bg-[#f2cc0d] items-center justify-center">
                            <StyledText className="font-bold text-[#221f10]">FH</StyledText>
                        </StyledView>
                        <StyledText className="text-xl font-bold text-white">
                            FootballHub<StyledText className="text-[#f2cc0d]">+</StyledText>
                        </StyledText>
                    </StyledView>
                    <StyledView className="w-10 h-10 rounded-full bg-white/10 items-center justify-center">
                        <StyledText className="text-white text-xs">🔔</StyledText>
                    </StyledView>
                </StyledView>

                <ScrollView className="flex-1">
                    {/* Live Match Hero */}
                    <StyledView className="mt-4 px-4">
                        <StyledView className="flex-row justify-between items-center mb-3">
                            <StyledText className="text-lg font-bold text-white">Live Matches</StyledText>
                            <StyledText className="text-[#f2cc0d]">See All</StyledText>
                        </StyledView>

                        <StyledView className="bg-[#2d2a1d] rounded-2xl p-4 border border-white/5 shadow-lg">
                            <StyledView className="flex-row justify-between items-center mb-4">
                                <StyledText className="text-white/40 text-xs uppercase">Botola Pro • 78'</StyledText>
                                <StyledView className="bg-red-500/10 px-2 py-1 rounded-full border border-red-500/20">
                                    <StyledText className="text-red-500 text-[10px] font-bold uppercase">Live</StyledText>
                                </StyledView>
                            </StyledView>

                            <StyledView className="flex-row justify-between items-center">
                                <StyledView className="items-center">
                                    <StyledView className="w-12 h-12 rounded-full bg-white/10 items-center justify-center mb-2">
                                        <StyledText className="text-white">R</StyledText>
                                    </StyledView>
                                    <StyledText className="text-white font-bold">Raja CA</StyledText>
                                </StyledView>

                                <StyledText className="text-3xl font-bold text-[#f2cc0d]">2 - 1</StyledText>

                                <StyledView className="items-center">
                                    <StyledView className="w-12 h-12 rounded-full bg-white/10 items-center justify-center mb-2">
                                        <StyledText className="text-white">W</StyledText>
                                    </StyledView>
                                    <StyledText className="text-white font-bold">Wydad AC</StyledText>
                                </StyledView>
                            </StyledView>
                        </StyledView>
                    </StyledView>

                    {/* Quick Actions */}
                    <StyledView className="mt-6 px-4">
                        <StyledText className="text-lg font-bold text-white mb-3">Quick Actions</StyledText>
                        <StyledView className="flex-row flex-wrap gap-3">
                            <ActionCard title="Tickets" icon="🎫" />
                            <ActionCard title="Shop" icon="🛍️" />
                            <ActionCard title="Fantasy" icon="🏆" />
                            <ActionCard title="AI Hub" icon="🧠" badge="New" />
                        </StyledView>
                    </StyledView>

                    {/* News Section */}
                    <StyledView className="mt-6 px-4 pb-8">
                        <StyledText className="text-lg font-bold text-white mb-3">Trending News</StyledText>
                        <StyledView className="h-48 rounded-2xl bg-[#2d2a1d] overflow-hidden relative">
                            <StyledView className="absolute bottom-0 p-4 w-full bg-black/60">
                                <StyledView className="flex-row items-center gap-2 mb-1">
                                    <StyledView className="bg-[#f2cc0d] px-2 py-0.5 rounded">
                                        <StyledText className="text-xs font-bold text-black">BREAKING</StyledText>
                                    </StyledView>
                                    <StyledText className="text-gray-300 text-xs">2h ago</StyledText>
                                </StyledView>
                                <StyledText className="text-white font-bold text-lg">Mbappé's Hat-trick Secures Historic Victory</StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView>
                </ScrollView>
            </SafeAreaView>
        </StyledView>
    );
}

function ActionCard({ title, icon, badge }: { title: string, icon: string, badge?: string }) {
    return (
        <StyledButton className="w-[48%] h-32 bg-[#2d2a1d] rounded-2xl p-4 justify-between border border-white/5">
            <StyledView className="w-10 h-10 rounded-full bg-[#f2cc0d]/10 items-center justify-center">
                <StyledText className="text-2xl">{icon}</StyledText>
            </StyledView>
            <StyledView>
                <StyledText className="text-white font-bold text-base">{title}</StyledText>
                {badge && <StyledText className="text-[#f2cc0d] text-xs">{badge}</StyledText>}
            </StyledView>
        </StyledButton>
    );
}
