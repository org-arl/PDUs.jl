var documenterSearchIndex = {"docs":
[{"location":"api.html#API-Reference","page":"API Reference","title":"API Reference","text":"","category":"section"},{"location":"api.html","page":"API Reference","title":"API Reference","text":"ProtocolDataUnits.PDU\nProtocolDataUnits.byteorder\nBase.length(::Type{<:PDU}, ::Val{Symbol}, ProtocolDataUnits.PDUInfo)\nProtocolDataUnits.PDUInfo\nBase.read(io::IO, ::Type{<:PDU})\nBase.write(io::IO, ::PDU)\nBase.Vector{UInt8}(::PDU)","category":"page"},{"location":"api.html#ProtocolDataUnits.PDU","page":"API Reference","title":"ProtocolDataUnits.PDU","text":"Parent data type for all PDUs.\n\n\n\n\n\n","category":"type"},{"location":"api.html#ProtocolDataUnits.byteorder","page":"API Reference","title":"ProtocolDataUnits.byteorder","text":"byteorder(::Type{T})\n\nByte order used for PDUs of type T. Defaults to BIG_ENDIAN. To change byte order, define a method for this function.\n\nExample:\n\nProtocolDataUnits.byteorder(::Type{MyPDU}) = LITTLE_ENDIAN\n\n\n\n\n\nbyteorder(::Type{T}, ::Val{s})\n\nByte order used for PDUs of type T for field s. Defaults to the same byte order as the PDU. To change byte order, define a method for this function.\n\nExample:\n\nProtocolDataUnits.byteorder(::Type{MyPDU}, ::Val{:myfield}) = LITTLE_ENDIAN\n\n\n\n\n\n","category":"function"},{"location":"api.html#Base.length-Tuple{Type{var\"#s1\"} where var\"#s1\"<:PDU, Val{Symbol}, Any}","page":"API Reference","title":"Base.length","text":"length(::Type{T}, ::Val{s}, info::PDUInfo)\n\nLength of field s in PDU of type T. Defaults to nothing, which indicates that the length is not known, and wire-encoding is used to store length as part of PDU. The length is specified in number of elements for vectors, and number of bytes for strings.\n\nExamples:\n\n# length of field x is 4 bytes less than length of PDU\nBase.length(::Type{MyPDU}, ::Val{:x}, info) = info.length - 4\n\n# length of field x is given by the value of field n in the PDU\nBase.length(::Type{MyPDU}, ::Val{:x}, info) = info.get(:n)\n\n\n\n\n\n","category":"method"},{"location":"api.html#ProtocolDataUnits.PDUInfo","page":"API Reference","title":"ProtocolDataUnits.PDUInfo","text":"PDU information with fields:\n\nlength: length of PDU in bytes, if known, missing otherwise\nget: function that returns value of field s in the PDU\n\n\n\n\n\n","category":"type"},{"location":"api.html#Base.read-Tuple{IO, Type{var\"#s1\"} where var\"#s1\"<:PDU}","page":"API Reference","title":"Base.read","text":"read(io::IO, T::PDU)\nread(io::IO, T::PDU; nbytes)\n\nDecodes a vector of bytes from stream io to give a PDU. If nbytes is specified, the PDU is assumed to be of length nbytes bytes.\n\n\n\n\n\n","category":"method"},{"location":"api.html#Base.write-Tuple{IO, PDU}","page":"API Reference","title":"Base.write","text":"write(io::IO, pdu::PDU)\n\nEncodes a PDU into a vector of bytes written to stream io.\n\n\n\n\n\n","category":"method"},{"location":"api.html#Base.Vector-Union{Tuple{PDU}, Tuple{UInt8}} where UInt8","page":"API Reference","title":"Base.Vector","text":"Vector{UInt8}(pdu::PDU)\n\nEncodes a PDU into a vector of bytes.\n\n\n\n\n\n","category":"method"},{"location":"index.html#ProtocolDataUnits.jl","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"","category":"section"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"Encoders and decoders for Protocol Data Units (PDUs)","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"CurrentModule = ProtocolDataUnits","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"PDUs encode information as byte streams that can be transmitted across a network or stored. ProtocolDataUnits.jl simplifies the process of encoding and decoding information as PDUs in a declarative way.","category":"page"},{"location":"index.html#Getting-started","page":"ProtocolDataUnits.jl","title":"Getting started","text":"","category":"section"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"The usage of the package is best illustrated with a simple example:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"using ProtocolDataUnits\n\n# define PDU format\nBase.@kwdef struct EthernetFrame <: PDU\n  dstaddr::NTuple{6,UInt8}    # fixed length\n  srcaddr::NTuple{6,UInt8}    # fixed length\n  ethtype::UInt16             # fixed length\n  payload::Vector{UInt8}      # variable length\n  crc::UInt32 = 0             # fixed length\nend\n\n# declare that the variable length of the payload can be computed\nBase.length(::Type{EthernetFrame}, ::Val{:payload}, info) = info.length - 18\n\n# create an Ethernet frame\nframe = EthernetFrame(\n  dstaddr = (0x01, 0x02, 0x03, 0x04, 0x05, 0x06),\n  srcaddr = (0x11, 0x12, 0x13, 0x14, 0x15, 0x16),\n  ethtype = 0x0800,\n  payload = [0x01, 0x02, 0x03, 0x04, 0x11, 0x12, 0x13, 0x14]\n)\n\n# convert to a byte array\nbytes = Vector{UInt8}(frame)\n\n# convert back to Ethernet frame\ndecoded = EthernetFrame(bytes)\n\n# check that they are the same\n@assert frame == decoded","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"The package can do much more, including nested PDUs, wire-encoding, CRC computation, etc.","category":"page"},{"location":"index.html#Basic-usage","page":"ProtocolDataUnits.jl","title":"Basic usage","text":"","category":"section"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"A PDU is declared as a struct subtyped from PDU. It may contain fields of the following types:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"Numeric types (various sized integers and floats)\nNTuple of numeric types\nAbstractVector of numeric types\nAbstractString\nOther PDUs\nAny other data type T that supports read(::IO, ::Type{T}) and write(::IO, ::T)","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"The size (in bytes) of numeric types and tuples of numeric types is known. However, vectors, strings and other data types may have variable sizes. If the size is unknown, a wire-encoded size/length field is implicitly added to the PDU representation when encoding it, and is used during decoding to infer size/length. Alternatively, the size/length of specific fields may be declared by defining a length() for specific fields in a PDU.","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"By default, network byte order (big endian) is used for multi-byte numeric values. That may be overridden for the PDU or for specific fields by declaring a byteorder().","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"PDUs are encoded into bytes in one of two ways:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"bytes = Vector{UInt8}(pdu)  # returns a vector of bytes\nwrite(io, pdu)              # writes bytes to an IOStream","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"PDUs are decoded from bytes in one of two ways:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"pdu = MyPDU(bytes)          # creates a MyPDU from bytes\npdu = read(io, MyPDU)       # creates a MyPDU by reading bytes from an IOStream","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"Usage is best illustrated through a series of examples.","category":"page"},{"location":"index.html#PDUs-with-fixed-length-fields","page":"ProtocolDataUnits.jl","title":"PDUs with fixed length fields","text":"","category":"section"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"Lets define a simple PDU where all field sizes are known:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"struct MySimplePDU <: PDU\n  a::Int16\n  b::UInt8\n  c::UInt8\n  d::NTuple{2,Int32}\n  e::Float32\n  f::Float64\nend\n\npdu = MySimplePDU(1, 2, 3, (4,5), 6f0, 7.0)","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"and then encode it into bytes:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"bytes = Vector{UInt8}(pdu)","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"This yields bytes = [0x00, 0x01, 0x02, 0x03, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00, 0x05, 0x40, 0xc0, 0x00, 0x00, 0x40, 0x1c, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00].","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"We can change the byte ordering for the PDU to little-endian:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"ProtocolDataUnits.byteorder(::Type{MySimplePDU}) = LITTLE_ENDIAN","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"Now:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"bytes = Vector{UInt8}(pdu)","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"yields [0x01, 0x00, 0x02, 0x03, 0x04, 0x00, 0x00, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1c, 0x40].","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"The bytes can be converted back to a PDU:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"pdu2 = MySimplePDU(bytes)","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"and we can verify that the recovered PDU has the same contents as the original: @assert pdu == pdu2.","category":"page"},{"location":"index.html#PDUs-with-variable-length-fields","page":"ProtocolDataUnits.jl","title":"PDUs with variable length fields","text":"","category":"section"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"We can define a slightly more complex PDU containing strings of potentially unknown length:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"struct MyLessSimplePDU <: PDU\n  a::Int16\n  b::String\nend\n\npdu = MyLessSimplePDU(1, \"hello world!\")","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"We can convert the PDU to bytes and back:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"bytes = Vector{UInt8}(pdu)\npdu2 = MyLessSimplePDU(bytes)\n@assert pdu == pdu2","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"The PDU will have a size of 15 bytes (2 bytes for a, 12 bytes for b = \"hello world!\", and 1 byte to store the length of b). The length of the string is encoded as a variable length number using wire-encoding.","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"If we knew the maximum length of the string beforehand (say 14 bytes), and wanted a fixed length PDU (14+2=16 bytes), we could declare the length:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"Base.length(::Type{MyLessSimplePDU}, ::Val{:b}, info) = 14\n\nbytes = Vector{UInt8}(pdu)\n@assert length(bytes) == 16\n\npdu2 = MyLessSimplePDU(bytes)\n@assert pdu == pdu2","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"Since the string b = \"hello world!\" occupies only 12 bytes, it is padded with two null ('\\0) bytes. If the length of b was larger than the allocated length, the string would be truncated:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"pdu = MyLessSimplePDU(1, \"hello world! how are you?\")\n\nbytes = Vector{UInt8}(pdu)\n@assert length(bytes) == 16\n\npdu2 = MyLessSimplePDU(bytes)\n@assert pdu2.b == \"hello world! h\"","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"We could also support variable length strings without having to store the length in the PDU if we knew the size of the PDU while decoding. To do so, we need to declare that the length of the string must be 2 bytes less than the length of the whole PDU:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"Base.length(::Type{MyLessSimplePDU}, ::Val{:b}, info) = info.length - 2","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"The info object provides information on the PDU being encoded or decoded. info.length tells us the size of the PDU in bytes, if known (otherwise it is missing). Now, we can encode arbitrary length strings in our PDU without the overhead of storing the length of the string:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"bytes = Vector{UInt8}(pdu)\n@assert length(bytes) == 2 + length(\"hello world! how are you?\")\n\npdu2 = MyLessSimplePDU(bytes)\n@assert pdu2.b == \"hello world! how are you?\"\n@assert pdu2 == pdu","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"We can also define field lengths that depend on the value of preceding fields. For example, if we happened to know that the length of string b is always 2a, we can declare:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"Base.length(::Type{MyLessSimplePDU}, ::Val{:b}, info) = 2 * info.get(:a)","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"Here info.get() provides us access to fields that are decoded earlier in the byte stream.","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"pdu = MyLessSimplePDU(6, \"hello world!\")\n\nbytes = Vector{UInt8}(pdu)\n@assert length(bytes) == 2 + 2*6\n\npdu2 = MyLessSimplePDU(bytes)\n@assert pdu2.b == \"hello world!\"","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"Had we set an a that is too small or big, the string would have been truncated or null padded:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"# string is null padded to 16 bytes\npdu = MyLessSimplePDU(8, \"hello world!\")\nbytes = Vector{UInt8}(pdu)\n@assert length(bytes) == 2 + 2*8\npdu2 = MyLessSimplePDU(bytes)\n@assert pdu2.b == \"hello world!\"\n\n# string is truncated to 8 bytes\npdu = MyLessSimplePDU(4, \"hello world!\")\nbytes = Vector{UInt8}(pdu)\n@assert length(bytes) == 2 + 2*4\npdu2 = MyLessSimplePDU(bytes)\n@assert pdu2.b == \"hello wo\"","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"Variable length vector fields work exactly in the same way, with length being defined as the number of elements in the vector (not number of bytes):","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"struct MyVectorPDU <: PDU\n  a::Int16\n  b::Vector{Float64}\nend\n\n# vector length is in number of Float64, but info.length is in number of bytes\nBase.length(::Type{MyVectorPDU}, ::Val{:b}, info) = (info.length - 2) ÷ sizeof(Float64)\n\npdu = MyVectorPDU(1, [1.0, 2.0, 3.0])\nbytes = Vector{UInt8}(pdu)\n@assert length(bytes) == 2 + 3 * sizeof(Float64)\npdu2 = MyVectorPDU(bytes)\n@assert pdu2 == pdu","category":"page"},{"location":"index.html#PDUs-with-nested-PDUs","page":"ProtocolDataUnits.jl","title":"PDUs with nested PDUs","text":"","category":"section"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"We can even nest PDUs:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"struct InnerPDU <: PDU\n  a::Int8\n  b::Float32\nend\n\nstruct OuterPDU <: PDU\n  x::Int16\n  y::InnerPDU\n  z::Int8\nend\n\npdu = OuterPDU(1, InnerPDU(2, 3f0), 4)","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"and encode and decode them effortlessly:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"bytes = Vector{UInt8}(pdu)\n@assert length(bytes) == 2 + (1 + 4) + 1\n\npdu2 = OuterPDU(bytes)\n\n@assert pdu2.y == pdu.y   # inner PDU matches\n@assert pdu2 == pdu       # so does the outer PDU","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"We can infer sizes of variable length fields in nested PDUs too:","category":"page"},{"location":"index.html","page":"ProtocolDataUnits.jl","title":"ProtocolDataUnits.jl","text":"struct InnerPDU2 <: PDU\n  a::Int8\n  b::String\nend\n\nstruct OuterPDU2 <: PDU\n  x::Int16\n  y::InnerPDU2\n  z::Int8\nend\n\nBase.length(::Type{InnerPDU2}, ::Val{:b}, info) = info.length - 1\nBase.length(::Type{OuterPDU2}, ::Val{:y}, info) = info.length - 3\n\npdu = OuterPDU2(1, InnerPDU2(2, \"hello world!\"), 4)\n\nbytes = Vector{UInt8}(pdu)\n@assert length(bytes) == 2 + (1 + 12) + 1\n\npdu2 = OuterPDU2(bytes)\n\n@assert pdu2.y == pdu.y\n@assert pdu2 == pdu","category":"page"}]
}
