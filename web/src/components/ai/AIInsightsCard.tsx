import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

/**
 * 🤖 Composant pour afficher les insights IA d'un match
 * 
 * @param {Object} props
 * @param {string} props.matchId - ID du match
 * @param {Function} props.onError - Callback en cas d'erreur
 */
export default function AIInsightsCard({ matchId, onError }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInsights();
  }, [matchId]);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/ai/insights/match/${matchId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch insights');
      }

      const data = await response.json();

      if (data.success && data.data) {
        setInsights(data.data);
      } else {
        setInsights(null);
      }

    } catch (err) {
      console.error('Error fetching insights:', err);
      setError(err.message);
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="text-blue-400 animate-spin" size={20} />
          <h3 className="text-lg font-bold text-white">Analyse IA en cours...</h3>
        </div>
        
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 border border-red-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="text-red-400" size={20} />
          <h3 className="text-lg font-bold text-white">Erreur</h3>
        </div>
        <p className="text-sm text-red-300">{error}</p>
        <button
          onClick={fetchInsights}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // No insights yet
  if (!insights || !insights.analysis) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="text-blue-400" size={20} />
          <h3 className="text-lg font-bold text-white">Analyse IA</h3>
        </div>
        <p className="text-sm text-gray-400">
          L'analyse IA sera disponible prochainement...
        </p>
      </div>
    );
  }

  const { analysis, confidence, generatedAt, viewCount } = insights;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-blue-500/20 rounded-2xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-400" size={20} />
          <h3 className="text-lg font-bold text-white">Analyse IA</h3>
        </div>
        
        {confidence && (
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full">
            <TrendingUp className="text-blue-400" size={14} />
            <span className="text-xs font-semibold text-blue-400">
              {Math.round(confidence * 100)}% confiance
            </span>
          </div>
        )}
      </div>

      {/* Summary */}
      {analysis.summary && (
        <div className="mb-4 p-4 bg-white/5 rounded-xl">
          <p className="text-sm text-gray-200 leading-relaxed">
            {analysis.summary}
          </p>
        </div>
      )}

      {/* Key Insights */}
      {analysis.keyInsights && analysis.keyInsights.length > 0 && (
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
            Points Clés
          </h4>
          {analysis.keyInsights.map((insight, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-300">{insight}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tactical Analysis */}
      {analysis.tacticalAnalysis && (
        <div className="mb-6 p-4 bg-white/5 rounded-xl">
          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
            Analyse Tactique
          </h4>
          
          {analysis.tacticalAnalysis.formation && (
            <div className="mb-3">
              <span className="text-xs text-gray-400">Formation:</span>
              <span className="ml-2 text-sm font-semibold text-white">
                {analysis.tacticalAnalysis.formation}
              </span>
            </div>
          )}

          {analysis.tacticalAnalysis.strengths && (
            <div className="mb-2">
              <span className="text-xs text-green-400 font-semibold">
                ✓ Forces:
              </span>
              <ul className="mt-1 ml-4 text-sm text-gray-300 space-y-1">
                {analysis.tacticalAnalysis.strengths.map((strength, i) => (
                  <li key={i}>• {strength}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.tacticalAnalysis.weaknesses && (
            <div>
              <span className="text-xs text-red-400 font-semibold">
                ✗ Faiblesses:
              </span>
              <ul className="mt-1 ml-4 text-sm text-gray-300 space-y-1">
                {analysis.tacticalAnalysis.weaknesses.map((weakness, i) => (
                  <li key={i}>• {weakness}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Key Players */}
      {analysis.keyPlayers && analysis.keyPlayers.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
            Joueurs Clés
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {analysis.keyPlayers.map((player, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-lg">
                <div className="font-semibold text-white text-sm">
                  {player.name}
                </div>
                <div className="text-xs text-gray-400">
                  {player.role}
                </div>
                {player.impact && (
                  <div className="text-xs text-gray-300 mt-1">
                    {player.impact}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prediction */}
      {analysis.prediction && (
        <div className="p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/30">
          <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
            Prédiction
          </h4>
          
          <p className="text-sm text-white mb-3">
            {analysis.prediction.reasoning || analysis.prediction.outcome}
          </p>

          {analysis.prediction.probabilities && (
            <div className="space-y-2">
              {Object.entries(analysis.prediction.probabilities).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-white font-semibold">
                      {Math.round(value * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${value * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {analysis.prediction.confidence !== undefined && (
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-400">Niveau de confiance</span>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden w-24">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                    style={{ width: `${analysis.prediction.confidence * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-white">
                  {Math.round(analysis.prediction.confidence * 100)}%
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between text-xs text-gray-400">
        <div>
          Généré le {new Date(generatedAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
        {viewCount > 0 && (
          <div>
            {viewCount} vue{viewCount > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}

// Version TypeScript (optionnel)
export interface AIInsightsProps {
  matchId: string;
  onError?: (error: Error) => void;
}
