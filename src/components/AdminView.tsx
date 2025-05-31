import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import ColorBox from './ColorBox';
import PasswordResetDialog from './PasswordResetDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const TAXI_COLORS = [
  '#DC2626', '#059669', '#2563EB', '#7C3AED',
  '#EA580C', '#BE185D', '#0891B2', '#65A30D'
];

const AdminView: React.FC = () => {
  const { 
    taxiState, 
    updateSelectedColors, 
    updateTextField1, 
    updateTextField2,
    updateTaxiName,
    resetPassword 
  } = useAppContext();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const { toast } = useToast();

  const handleColorToggle = (index: number) => {
    const newColors = [...taxiState.selectedColors];
    newColors[index] = !newColors[index];
    updateSelectedColors(newColors);
  };

  const clearAll = () => {
    updateSelectedColors(new Array(8).fill(false));
    updateTextField1('');
    updateTextField2('');
  };

  const handlePasswordReset = (newPassword: string) => {
    resetPassword(newPassword);
    toast({
      title: 'Success',
      description: 'Admin password has been reset successfully',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">🔧 Admin Control Panel</CardTitle>
            <p className="text-purple-100">Manage taxi availability and announcements</p>
          </CardHeader>
        </Card>

        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Select Available Taxis</h3>
              <Button onClick={clearAll} variant="outline" size="sm">
                Clear All
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-8 justify-items-center">
              {TAXI_COLORS.map((color, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <ColorBox
                    color={color}
                    isSelected={taxiState.selectedColors[index]}
                    onClick={() => handleColorToggle(index)}
                    isClickable={true}
                  />
                  <Input
                    value={taxiState.taxiNames[index]}
                    onChange={(e) => updateTaxiName(index, e.target.value)}
                    className="text-center text-sm w-20"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Announcements</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="text1">Announcement 1</Label>
                <Textarea
                  id="text1"
                  value={taxiState.textField1}
                  onChange={(e) => updateTextField1(e.target.value)}
                  placeholder="Enter first announcement..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="text2">Announcement 2</Label>
                <Textarea
                  id="text2"
                  value={taxiState.textField2}
                  onChange={(e) => updateTextField2(e.target.value)}
                  placeholder="Enter second announcement..."
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Security</h3>
            <Button onClick={() => setShowResetDialog(true)} variant="destructive">
              Reset Admin Password
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              Change the admin panel password
            </p>
          </CardContent>
        </Card>
      </div>

      <PasswordResetDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        onConfirm={handlePasswordReset}
      />
    </div>
  );
};

export default AdminView;