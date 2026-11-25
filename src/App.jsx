import React, { useState, useMemo, useRef, useCallback } from 'react';
import AppShell from './components/AppShell';
import Toast from './components/Toast';
import HomeView from './views/HomeView';
import BookingView from './views/BookingView';
import WorkoutsView from './views/WorkoutsView';
import AccountView from './views/AccountView';

import BookingConfirmModal from './components/BookingConfirmModal';
import SedeSelectorModal from './components/SedeSelectorModal';
import MyReservationsDrawer from './components/MyReservationsDrawer';
import DirectionsModal from './components/DirectionsModal';
import WorkoutPlayerModal from './components/WorkoutPlayerModal';

import {
  INITIAL_USER,
  SEDES,
  INITIAL_BOOKINGS,
} from './data/mockData';

export default function App() {
  // Navigation: 'inicio' | 'reservar' | 'workouts' | 'cuenta'
  const [activeTab, setActiveTab] = useState('reservar'); // Core booking flow first

  // User State
  const [user] = useState(INITIAL_USER);
  const [favoriteSedeId, setFavoriteSedeId] = useState(INITIAL_USER.favoriteSedeId);

  // Selected Sede for current booking view
  const [currentSedeId, setCurrentSedeId] = useState(INITIAL_USER.favoriteSedeId);

  // Active bookings list
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  // Waitlist slots set
  const [waitlistSlotIds, setWaitlistSlotIds] = useState([]);

  // Favorite workouts set
  const [favoriteWorkoutIds, setFavoriteWorkoutIds] = useState(['w-upper-1', 'w-upper-2', 'w-core-1']);

  // Modals state
  const [pendingBooking, setPendingBooking] = useState(null);
  const [isSedeModalOpen, setIsSedeModalOpen] = useState(false);
  const [isReservationsDrawerOpen, setIsReservationsDrawerOpen] = useState(false);
  const [directionsTarget, setDirectionsTarget] = useState(null);
  const [activeWorkoutPlayer, setActiveWorkoutPlayer] = useState(null);

  // Toast Notification (Strictly no emojis)
  const [toast, setToast] = useState(null);

  const showToast = (title, message = '', type = 'success') => {
    setToast({ title, message, type });
  };
  const closeToast = useCallback(() => setToast(null), []);

  // Scroll container (para volver arriba al cambiar de pestaña)
  const scrollRef = useRef(null);
  const handleSelectTab = (tab) => {
    setActiveTab(tab);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  // Derived Sede Objects
  const currentSede = useMemo(() => {
    return SEDES.find((s) => s.id === currentSedeId) || SEDES[0];
  }, [currentSedeId]);

  const favoriteSede = useMemo(() => {
    return SEDES.find((s) => s.id === favoriteSedeId) || SEDES[0];
  }, [favoriteSedeId]);

  // Handlers for Sedes
  const handleSelectSede = (sede) => {
    setCurrentSedeId(sede.id);
  };

  const handleSetFavoriteSede = (sede) => {
    setFavoriteSedeId(sede.id);
    showToast(
      `${sede.name} fijada como predeterminada`,
      'Tu grilla principal ahora mostrará esta sede por defecto.',
      'info'
    );
  };

  // Handlers for Booking
  const handleInitiateBooking = ({ slot, sede, dateObj }) => {
    setPendingBooking({ slot, sede, dateObj });
  };

  const handleConfirmBooking = (slot, sede, dateObj) => {
    const newBooking = {
      id: `res-${Date.now()}`,
      sedeId: sede.id,
      sedeName: sede.name,
      address: sede.address,
      dateId: dateObj.id,
      dateFormatted: dateObj.isToday ? 'Hoy • ' + dateObj.dayName : `${dateObj.dayName} ${dateObj.dateNum} • Nov`,
      time: slot.time,
      timeLabel: `${slot.time} HS`,
      duration: slot.duration,
      coach: slot.coach || 'Coach CORE',
      status: 'confirmed',
    };

    setBookings((prev) => [newBooking, ...prev]);
    setPendingBooking(null);

    showToast(
      `Clase confirmada en ${sede.name}`,
      `${dateObj.dayName} ${dateObj.dateNum} a las ${slot.time} HS`,
      'success'
    );
  };

  const handleCancelBooking = (bookingId) => {
    const targetBooking = bookings.find((b) => b.id === bookingId);
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));

    showToast(
      'Reserva cancelada',
      targetBooking ? `Lugar liberado en ${targetBooking.sedeName} a las ${targetBooking.time} HS.` : 'Tu lugar ha sido liberado.',
      'info'
    );
  };

  // Waitlist toggle
  const handleToggleWaitlist = (slotId, slotTime, sedeName) => {
    const isAlready = waitlistSlotIds.includes(slotId);
    if (isAlready) {
      setWaitlistSlotIds((prev) => prev.filter((id) => id !== slotId));
      showToast('Eliminado de lista de espera', `${slotTime} HS en ${sedeName}`, 'info');
    } else {
      setWaitlistSlotIds((prev) => [...prev, slotId]);
      showToast('Registrado en lista de espera', `Te notificaremos de inmediato si se libera un cupo para las ${slotTime} HS.`, 'success');
    }
  };

  // Workouts favorites toggle
  const handleToggleFavoriteWorkout = (workoutId) => {
    const exists = favoriteWorkoutIds.includes(workoutId);
    setFavoriteWorkoutIds((prev) =>
      exists ? prev.filter((id) => id !== workoutId) : [...prev, workoutId]
    );
    if (exists) {
      showToast('Eliminada de guardados', '', 'info');
    } else {
      showToast('Rutina guardada', 'Disponible en tu pestaña de Guardados', 'success');
    }
  };

  // Quick action from Home to Booking
  const handleGoToBooking = (targetSede) => {
    if (targetSede) {
      setCurrentSedeId(targetSede.id);
    }
    handleSelectTab('reservar');
  };

  const handleShareWeekPass = () => {
    showToast(
      'Enlace copiado al portapapeles',
      'Compartí este pase con un amigo para entrenar 1 semana gratis en CORE.',
      'success'
    );
  };

  return (
    <>
      <AppShell
        ref={scrollRef}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        bookingsCount={bookings.length}
      >
        <div key={activeTab} className="animate-in fade-in duration-200">
          {activeTab === 'inicio' && (
            <HomeView
              user={user}
              favoriteSede={favoriteSede}
              bookings={bookings}
              onGoToBooking={handleGoToBooking}
              onOpenMyReservations={() => setIsReservationsDrawerOpen(true)}
              onOpenDirections={(target) => setDirectionsTarget(target)}
              onShareWeekPass={handleShareWeekPass}
            />
          )}

          {activeTab === 'reservar' && (
            <BookingView
              currentSede={currentSede}
              favoriteSedeId={favoriteSedeId}
              bookings={bookings}
              waitlistSlotIds={waitlistSlotIds}
              onOpenSedeSelector={() => setIsSedeModalOpen(true)}
              onOpenMyReservations={() => setIsReservationsDrawerOpen(true)}
              onInitiateBooking={handleInitiateBooking}
              onCancelBooking={handleCancelBooking}
              onToggleWaitlist={handleToggleWaitlist}
            />
          )}

          {activeTab === 'workouts' && (
            <WorkoutsView
              favoriteWorkoutIds={favoriteWorkoutIds}
              onToggleFavorite={handleToggleFavoriteWorkout}
              onOpenPlayer={(w) => setActiveWorkoutPlayer(w)}
            />
          )}

          {activeTab === 'cuenta' && (
            <AccountView
              user={user}
              favoriteSede={favoriteSede}
              bookingsCount={bookings.length}
              onOpenSedeSelector={() => setIsSedeModalOpen(true)}
              onOpenMyReservations={() => setIsReservationsDrawerOpen(true)}
            />
          )}
        </div>
      </AppShell>

      {/* --- Overlays (fixed, por encima de todo el layout) --- */}
      <Toast toast={toast} onClose={closeToast} />

      {isSedeModalOpen && (
        <SedeSelectorModal
          currentSede={currentSede}
          favoriteSedeId={favoriteSedeId}
          onSelectSede={handleSelectSede}
          onSetFavoriteSede={handleSetFavoriteSede}
          onClose={() => setIsSedeModalOpen(false)}
        />
      )}

      {isReservationsDrawerOpen && (
        <MyReservationsDrawer
          bookings={bookings}
          onCancelBooking={handleCancelBooking}
          onOpenDirections={(target) => setDirectionsTarget(target)}
          onGoToBooking={() => {
            setIsReservationsDrawerOpen(false);
            handleSelectTab('reservar');
          }}
          onClose={() => setIsReservationsDrawerOpen(false)}
        />
      )}

      {pendingBooking && (
        <BookingConfirmModal
          slot={pendingBooking.slot}
          sede={pendingBooking.sede}
          dateObj={pendingBooking.dateObj}
          onConfirm={handleConfirmBooking}
          onClose={() => setPendingBooking(null)}
        />
      )}

      {directionsTarget && (
        <DirectionsModal target={directionsTarget} onClose={() => setDirectionsTarget(null)} />
      )}

      {activeWorkoutPlayer && (
        <WorkoutPlayerModal
          workout={activeWorkoutPlayer}
          isFavorite={favoriteWorkoutIds.includes(activeWorkoutPlayer.id)}
          onToggleFavorite={handleToggleFavoriteWorkout}
          onClose={() => setActiveWorkoutPlayer(null)}
        />
      )}
    </>
  );
}
