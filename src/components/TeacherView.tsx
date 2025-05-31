import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import ColorBox from './ColorBox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TAXI_COLORS = [
  '#DC2626', '#059669', '#2563EB', '#7C3AED',
  '#EA580C', '#BE185D', '#0891B2', '#65A30D'
];

const TeacherView: React.FC = () => {
  const { taxiState } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">🚕 Taxi Pickup Status</CardTitle>
            <p className="text-blue-100">Available taxis are highlighted below</p>
          </CardHeader>
        </Card>

        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Taxis</h3>
            <div className="grid grid-cols-4 gap-8 justify-items-center">
              {TAXI_COLORS.map((color, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <ColorBox
                    color={color}
                    isSelected={taxiState.selectedColors[index]}
                    isClickable={false}
                  />
                  <span className="text-sm font-medium text-gray-600">
                    {taxiState.taxiNames[index]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {(taxiState.textField1 || taxiState.textField2) && (
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Announcements</h3>
              {taxiState.textField1 && (
                <div className="mb-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-gray-800">{taxiState.textField1}</p>
                </div>
              )}
              {taxiState.textField2 && (
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-gray-800">{taxiState.textField2}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TeacherView;