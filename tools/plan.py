"""Every NCERT physics chapter the library will cover, in build order (Class 11 first).

Each chapter: (number, title, slug, NCERT PDF code). The PDFs live at https://ncert.nic.in/textbook/pdf/<code>.pdf.
A chapter is "done" when tools/content/class-NN/chNN/chapter.py exists and builds.
"""

PLAN = [
    {'class': 11, 'subject': 'physics', 'book': 'Physics (NCERT, Class 11)', 'chapters': [
        (1, 'Units and Measurement', 'units-and-measurement', 'keph101'),
        (2, 'Motion in a Straight Line', 'motion-in-a-straight-line', 'keph102'),
        (3, 'Motion in a Plane', 'motion-in-a-plane', 'keph103'),
        (4, 'Laws of Motion', 'laws-of-motion', 'keph104'),
        (5, 'Work, Energy and Power', 'work-energy-and-power', 'keph105'),
        (6, 'System of Particles and Rotational Motion', 'system-of-particles-and-rotational-motion', 'keph106'),
        (7, 'Gravitation', 'gravitation', 'keph107'),
        (8, 'Mechanical Properties of Solids', 'mechanical-properties-of-solids', 'keph201'),
        (9, 'Mechanical Properties of Fluids', 'mechanical-properties-of-fluids', 'keph202'),
        (10, 'Thermal Properties of Matter', 'thermal-properties-of-matter', 'keph203'),
        (11, 'Thermodynamics', 'thermodynamics', 'keph204'),
        (12, 'Kinetic Theory', 'kinetic-theory', 'keph205'),
        (13, 'Oscillations', 'oscillations', 'keph206'),
        (14, 'Waves', 'waves', 'keph207'),
    ]},
    {'class': 12, 'subject': 'physics', 'book': 'Physics (NCERT, Class 12)', 'chapters': [
        (1, 'Electric Charges and Fields', 'electric-charges-and-fields', 'leph101'),
        (2, 'Electrostatic Potential and Capacitance', 'electrostatic-potential-and-capacitance', 'leph102'),
        (3, 'Current Electricity', 'current-electricity', 'leph103'),
        (4, 'Moving Charges and Magnetism', 'moving-charges-and-magnetism', 'leph104'),
        (5, 'Magnetism and Matter', 'magnetism-and-matter', 'leph105'),
        (6, 'Electromagnetic Induction', 'electromagnetic-induction', 'leph106'),
        (7, 'Alternating Current', 'alternating-current', 'leph107'),
        (8, 'Electromagnetic Waves', 'electromagnetic-waves', 'leph108'),
        (9, 'Ray Optics and Optical Instruments', 'ray-optics-and-optical-instruments', 'leph201'),
        (10, 'Wave Optics', 'wave-optics', 'leph202'),
        (11, 'Dual Nature of Radiation and Matter', 'dual-nature-of-radiation-and-matter', 'leph203'),
        (12, 'Atoms', 'atoms', 'leph204'),
        (13, 'Nuclei', 'nuclei', 'leph205'),
        (14, 'Semiconductor Electronics', 'semiconductor-electronics', 'leph206'),
    ]},
]
