import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import db from '@/firebase';
import ColorBox from './ColorBox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TAXI_COLORS = [
  '#DC2626', '#059669', '#2563EB', '#7C3AED',
  '#EA580C', '#BE185D', '#0891B2', '#65A30D'
];

const TeacherView: React.FC = () => {
  const [selectedColors, setSelectedColors] = useState<boolean[]>(new Array(8).fill(false));
  const [taxiNames, setTaxiNames] = useState<string[]>(new Array(8).fill(''));
  const [textField1, setTextField1] = useState('');
  const [textField2, setTextField2] = useState('');

  useEffect(() => {
    const ref = doc(db, 'selection', 'current');

    const unsubscribe = onSnapshot(ref, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();

        // Match selected hex colors to the original color array
        const colorBooleans = TAXI_COLORS.map(color => data.selectedColors?.includes(color) || false);
        setSelectedColors(colorBooleans);

        setTaxiNames(data.taxiNames || new Array(8).fill(''));
        setTextField1(data.textField1 || '');
        setTextField2(data.textField2 || '');
      }
    });

    return () => unsubscribe();
  }, []);

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
                    isSelected={selectedColors[index]}
                    isClickable={false}
                  />
                  <span className="text-sm font-medium text-gray-600">
                    {taxiNames[index]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {(textField1 || textField2) && (
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Announcements</h3>
              {textField1 && (
                <div className="mb-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-gray-800">{textField1}</p>
                </div>
              )}
              {textField2 && (
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-gray-800">{textField2}</p>
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
