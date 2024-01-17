import json


uni_str = """
Abertay University
Aberystwyth University
Anglia Ruskin University
Aston University
Bangor University
Bath Spa University
Birbeck, University of London
Birmingham City University
Bournemouth University
Brunel University
Bucks New Univeristy
Canterbury Christ Church University
Cardiff Met
Cardiff University
Central School of Speech and Drama
City University London 
Coventry University 
Cranfield University
De Montford University 
Durham University 
Edge Hill University 
Edinburgh Napier University
Glasgow caledonian University
Glyndwr University 
Goldsmiths, University of London
Guildhall School of Music and Drama
Harper Adams Univeristy 
Heriot-Watt University
Heythrop College
Imperial College London 
Institute of Education: University of London
Keele University 
Kings College London
Kingston University
Lancaster University
Leeds Beckett University 
Liverpool Hope University
Liverpool John Moores
London Business School
London Met
London School of Economics
London School of Hygiene
London South Bank University
LoughBorough University
Manchester Metropolitan University 
Middlesex University
Newcastle University
Northumbria University
Nottingham Trent University
Open University
Oxford Brookes University
Plymouth University
Queen Margaret University
Queen Mary London 
Queen's University Belfast
Robert Gordon University 
Royal Academy of Music
Royal College of Art 
Royal College of Music 
Royal Holloway
Royal Veterinary College
School of Oriental and African Studies
Sheffield Hallam University
Southampton Solent University
St George's University of London
Staffordshire University
Swansea University
Teeside University 
Trinity Laban Conservatoire of Music and Dance
Trinity St David
University College London
University of Aberdeen
University of Bath
University of Bedfordshire
University of Birmingham
University of Bolton
University of Bradford
University of Brighton 
University of Bristol 
University of Cambridge
University of Central Lancashire
University of Chester
University of Chicester
University of Cumbria 
University of Derby 
University of Dundee 
University of East Anglia 
University of East London
University of Edinburgh
University of Essex 
University of Exeter
University of Glasgow  
University of Gloucestershire
University of Greenwich
University of Hertfordshire
University of Huddersfield
University of Hull
University of Kent
University of Leeds
University of Leicester
University of Lincoln 
University of Liverpool
University of London
University of Manchester
University of Northampton 
University of Nottingham
University of Oxford 
University of Portsmouth
University of Reading 
University of Roehampton 
University of Salford
University of Sheffield
University of South Wales
University of Southampton 
University of Stirling
University of Strathclyde
University of Sunderland 
University of Surrey 
University of Sussex
University of the Arts London
University of the West of Scotland
University of Ulster
University of Wales
University of Wales, Trinity St David 
University of Warwick
University of West England, Bristol
University of West London
University of Westminster
University of Winchester
University of Wolverhampton
University of Worcester  
University of York 
University St Andrews
York St John University
"""



uni_email_str = """
foi@abertay.ac.uk
infocompliance@aber.ac.uk
foi@anglia.ac.uk
foi_requests@aston.ac.uk
info-compliance@bangor.ac.uk
foi-officer@bathspa.ac.uk
foi@bbk.ac.uk 
FreedomOfInformation@bcu.ac.uk
FOIA@bournemouth.ac.uk
foirequests@brunel.ac.uk
FOIofficer@bucks.ac.uk
foi@canterbury.ac.uk
freedomofinfo@cardiffmet.ac.uk
Inforequest@cardiff.ac.uk 
foi@cssd.ac.uk
FOI@city.ac.uk
foia@coventry.ac.uk
foi@cranfield.ac.uk 
foi@dmu.ac.uk
info.access@durham.ac.uk
foi@edgehill.ac.uk
foi@napier.ac.uk 
foi@gcu.ac.uk 
foi@glyndwr.ac.uk
foi@gold.ac.uk
katie.hudson@gsmd.ac.uk
foi@harper-adams.ac.uk
foi@hw.ac.uk
s.rospigliosi@heythrop.ac.uk
foi@imperial.ac.uk
foi@ucl.ac.uk
foi@keele.ac.uk
info-compliance@kcl.ac.uk
freedomofinformation@kingston.ac.uk
foi@lancs.ac.uk 
foi@leedsbeckett.ac.uk
foi@hope.ac.uk
foi@ljmu.ac.uk 
foi@london.edu
foi@londonmet.ac.uk
glpd.info.rights@lse.ac.uk
foi@lshtm.ac.uk 
foi@lsbu.ac.uk 
foi@lboro.ac.uk 
foi@mmu.ac.uk
t.kelly@mdx.ac.uk 
Rec-Man@ncl.ac.uk
us.foi@northumbria.ac.uk
foi.enquiries@ntu.ac.uk 
Freedom-of-Information@open.ac.uk 
info.sec@brookes.ac.uk 
foi@plymouth.ac.uk 
foi@qmu.ac.uk 
foi-enquiries@qmul.ac.uk
info.compliance@qub.ac.uk  
recordsmanagement@rgu.ac.uk
foi@ram.ac.uk
foi@rca.ac.uk
RCMFoi@rcm.ac.uk
FOI@royalholloway.ac.uk
FOI@RVC.ac.uk
freedomofinformation@soas.ac.uk
foi@shu.ac.uk 
freedom.information@solent.ac.uk
FOI@sgul.ac.uk
foi@staffs.ac.uk 
foi@swansea.ac.uk
foi@tees.ac.uk
foi@trinitylaban.ac.uk
foi@sm.uwtsd.ac.uk 
foi@ucl.ac.uk
foi@abdn.ac.uk 
freedom-of-information@bath.ac.uk
legaloffice@beds.ac.uk
foi@contacts.bham.ac.uk
enquiries@bolton.ac.uk
foi@bradford.ac.uk 
foi@brighton.ac.uk
Freedom-Information@bristol.ac.uk
foi@admin.cam.ac.uk 
dpfoia@uclan.ac.uk 
foia@chester.ac.uk 
foi@chi.ac.uk
foia@cumbria.ac.uk
foi@derby.ac.uk
freedomofinformation@dundee.ac.uk
foi@uea.ac.uk
foi@uel.ac.uk
recordsmanagement@ed.ac.uk
foi@essex.ac.uk
dataprotection@exeter.ac.uk
foi@gla.ac.uk
freedomofinformation@glos.ac.uk
compliance@greenwich.ac.uk 
Foi-request@herts.ac.uk
foi@hud.ac.uk 
Foi@hull.ac.uk
foi@kent.ac.uk 
foi@leeds.ac.uk 
ias@le.ac.uk 
compliance@lincoln.ac.uk
foi@liv.ac.uk
records.management@london.ac.uk  
foi@manchester.ac.uk
recordsmanager@northampton.ac.uk
freedom-of-information@nottingham.ac.uk 
foi@admin.ox.ac.uk
freedom-of-information@port.ac.uk
imps@reading.ac.uk
foi@roehampton.ac.uk
foi@salford.ac.uk 
foi@sheffield.ac.uk 
freedomofinformation@southwales.ac.uk
foi@soton.ac.uk
foiunit@stir.ac.uk 
foi@strath.ac.uk 
SUNFOI@sunderland.ac.uk
Freedomofinformation@surrey.ac.uk
foi@sussex.ac.uk 
foi@arts.ac.uk 
foi@uws.ac.uk 
foi@ulster.ac.uk 
compliance@wales.ac.uk  
foi@sm.uwtsd.ac.uk
infocompliance@warwick.ac.uk
foi@uwe.ac.uk
university.secretary@uwl.ac.uk
foi@westminster.ac.uk 
foi@winchester.ac.uk 
foi@wlv.ac.uk 
foi@worc.ac.uk
foi@york.ac.uk
foi@st-andrews.ac.uk 
foi@yorksj.ac.uk
"""

if __name__ == "__main__":

    uni_split = uni_str.split("\n")
    uni_split.pop(0)
    uni_split.pop()

    uni_json_list = []

    for uni in uni_split:
        label = uni
        value = uni # label.replace(" ", "_").lower()
        uni_json_list.append(
            {"label": label,
             "value": value }
        )
    


    # print(uni_json_list)

    json_uni_list = json.dumps(uni_json_list)

    with open("university_list.json", "w") as json_file:
        json_file.write(json_uni_list)

    uni_email_split = uni_email_str.split("\n")
    uni_email_split.pop(0)
    uni_email_split.pop()
    uni_dict = {}
    for uni, uni_email in zip(uni_split, uni_email_split):
        # uni = uni.replace(" ", "").lower()
        email = uni_email.split("@")[1].strip()
        uni_dict[uni] = email

    json_uni_list = json.dumps(uni_dict)
    
    with open("university_emails.json", "w") as json_file:
        json_file.write(json_uni_list)



